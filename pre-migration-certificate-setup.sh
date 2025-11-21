#!/bin/bash

##############################################################################
# pre-migration-certificate-setup.sh
#
# Prepares SSL certificate and removes CloudFront alias from old environment
# MUST be run before deploying Admin to a new environment
#
# This script:
# 1. Requests ACM certificate in us-east-1 (required for CloudFront)
# 2. Adds DNS validation record to Route53
# 3. Waits for certificate validation
# 4. Removes the domain alias from old CloudFront distribution
#
# Prerequisites:
# - AWS CLI configured with required profiles
# - Route53 hosted zone for bcparks.ca
# - Access to old environment CloudFront distribution
#
# Usage:
#   ./pre-migration-certificate-setup.sh <environment> <domain-name>
#
# Examples:
#   ./pre-migration-certificate-setup.sh dev dev-ar.bcparks.ca
#   ./pre-migration-certificate-setup.sh test test-ar.bcparks.ca
##############################################################################

set -e  # Exit on error
set -u  # Exit on undefined variable

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check arguments
if [ $# -ne 2 ]; then
    echo -e "${RED}ERROR: Invalid arguments${NC}"
    echo ""
    echo "Usage: $0 <environment> <domain-name>"
    echo ""
    echo "Examples:"
    echo "  $0 dev dev-ar.bcparks.ca"
    echo "  $0 test test-ar.bcparks.ca"
    exit 1
fi

ENVIRONMENT=$1
DOMAIN_NAME=$2

# Set AWS profiles based on environment
case $ENVIRONMENT in
    dev)
        OLD_PROFILE="xyg14p-dev"
        OLD_ACCOUNT="856925536711"
        ;;
    test)
        OLD_PROFILE="xyg14p-test"
        OLD_ACCOUNT="856925536711"
        ;;
    prod)
        echo -e "${RED}ERROR: This script is for dev/test only. Prod requires special handling.${NC}"
        exit 1
        ;;
    *)
        echo -e "${RED}ERROR: Invalid environment: $ENVIRONMENT${NC}"
        echo "Valid environments: dev, test"
        exit 1
        ;;
esac

LZA_PROFILE="059942063916_BCGOV_LZA_Admin"
LZA_ACCOUNT="059942063916"
PARKSWEB_PROFILE="parksweb"
ROUTE53_ZONE_ID="Z016985813W44F7VV5I65"  # bcparks.ca zone

echo -e "${BLUE}======================================================================${NC}"
echo -e "${BLUE}BC Parks A&R - Pre-Migration Certificate Setup${NC}"
echo -e "${BLUE}======================================================================${NC}"
echo ""
echo -e "${BLUE}Configuration:${NC}"
echo "Environment: ${ENVIRONMENT}"
echo "Domain: ${DOMAIN_NAME}"
echo "Old Account: ${OLD_ACCOUNT} (${OLD_PROFILE})"
echo "New Account: ${LZA_ACCOUNT} (${LZA_PROFILE})"
echo ""

# Step 1: Request ACM certificate in LZA account
echo -e "${YELLOW}Step 1: Requesting ACM certificate in us-east-1...${NC}"

CERT_ARN=$(aws acm request-certificate \
    --domain-name "${DOMAIN_NAME}" \
    --validation-method DNS \
    --profile ${LZA_PROFILE} \
    --region us-east-1 \
    --no-cli-pager \
    --query 'CertificateArn' \
    --output text)

echo -e "${GREEN}✓ Certificate requested: ${CERT_ARN}${NC}"
echo ""

# Step 2: Get DNS validation record
echo -e "${YELLOW}Step 2: Getting DNS validation record...${NC}"
sleep 3  # Wait a moment for AWS to generate the validation record

VALIDATION_RECORD=$(aws acm describe-certificate \
    --certificate-arn "${CERT_ARN}" \
    --profile ${LZA_PROFILE} \
    --region us-east-1 \
    --no-cli-pager \
    --query 'Certificate.DomainValidationOptions[0].ResourceRecord' \
    --output json)

VALIDATION_NAME=$(echo $VALIDATION_RECORD | jq -r '.Name')
VALIDATION_VALUE=$(echo $VALIDATION_RECORD | jq -r '.Value')

echo "Validation CNAME Record:"
echo "  Name:  ${VALIDATION_NAME}"
echo "  Value: ${VALIDATION_VALUE}"
echo ""

# Step 3: Add DNS validation record to Route53
echo -e "${YELLOW}Step 3: Adding DNS validation record to Route53...${NC}"

cat > /tmp/cert-validation-${ENVIRONMENT}.json <<EOF
{
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${VALIDATION_NAME}",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "${VALIDATION_VALUE}"
          }
        ]
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets \
    --hosted-zone-id ${ROUTE53_ZONE_ID} \
    --change-batch file:///tmp/cert-validation-${ENVIRONMENT}.json \
    --profile ${PARKSWEB_PROFILE} \
    --no-cli-pager > /dev/null

echo -e "${GREEN}✓ DNS validation record added${NC}"
echo ""

# Step 4: Wait for certificate validation
echo -e "${YELLOW}Step 4: Waiting for certificate validation (this may take 5-10 minutes)...${NC}"

aws acm wait certificate-validated \
    --certificate-arn "${CERT_ARN}" \
    --profile ${LZA_PROFILE} \
    --region us-east-1

echo -e "${GREEN}✓ Certificate validated successfully${NC}"
echo ""

# Step 5: Find old CloudFront distribution
echo -e "${YELLOW}Step 5: Finding old CloudFront distribution using ${DOMAIN_NAME}...${NC}"

OLD_DIST_ID=$(aws cloudfront list-distributions \
    --profile ${OLD_PROFILE} \
    --no-cli-pager \
    --query "DistributionList.Items[?contains(Aliases.Items, '${DOMAIN_NAME}')].Id" \
    --output text)

if [ -z "$OLD_DIST_ID" ]; then
    echo -e "${YELLOW}⚠ No CloudFront distribution found with alias ${DOMAIN_NAME}${NC}"
    echo "This is OK if this is the first migration or the domain was already removed."
else
    echo "Found distribution: ${OLD_DIST_ID}"
    echo ""
    
    # Step 6: Remove alias from old distribution
    echo -e "${YELLOW}Step 6: Removing alias from old CloudFront distribution...${NC}"
    
    # Get current config
    aws cloudfront get-distribution-config \
        --id ${OLD_DIST_ID} \
        --profile ${OLD_PROFILE} \
        --no-cli-pager > /tmp/old-dist-config-${ENVIRONMENT}.json
    
    ETAG=$(cat /tmp/old-dist-config-${ENVIRONMENT}.json | jq -r '.ETag')
    
    # Remove aliases and custom certificate
    cat /tmp/old-dist-config-${ENVIRONMENT}.json | \
        jq '.DistributionConfig.Aliases.Items = [] |
            .DistributionConfig.Aliases.Quantity = 0 |
            .DistributionConfig.ViewerCertificate = {
                "CloudFrontDefaultCertificate": true,
                "MinimumProtocolVersion": "TLSv1"
            } |
            .DistributionConfig' > /tmp/updated-dist-config-${ENVIRONMENT}.json
    
    # Update distribution
    aws cloudfront update-distribution \
        --id ${OLD_DIST_ID} \
        --profile ${OLD_PROFILE} \
        --no-cli-pager \
        --distribution-config file:///tmp/updated-dist-config-${ENVIRONMENT}.json \
        --if-match ${ETAG} > /dev/null
    
    echo -e "${GREEN}✓ Alias removed from old distribution${NC}"
    echo -e "${YELLOW}  Note: CloudFront distribution update is in progress (takes 5-15 minutes)${NC}"
fi

echo ""
echo -e "${GREEN}======================================================================${NC}"
echo -e "${GREEN}✓ Pre-Migration Certificate Setup Complete${NC}"
echo -e "${GREEN}======================================================================${NC}"
echo ""
echo -e "${BLUE}Certificate Details:${NC}"
echo "  ARN: ${CERT_ARN}"
echo "  Domain: ${DOMAIN_NAME}"
echo "  Region: us-east-1"
echo "  Status: ISSUED"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Save this certificate ARN for the deployment workflow"
echo "2. Update the GitHub workflow with this certificate ARN"
echo "3. Proceed with Admin deployment"
echo ""
echo -e "${BLUE}For GitHub workflow, use these parameter overrides:${NC}"
echo "  EnvDomainName=\"${DOMAIN_NAME}\""
echo "  DomainCertificateArn=\"${CERT_ARN}\""
echo ""

# Clean up temp files
rm -f /tmp/cert-validation-${ENVIRONMENT}.json
rm -f /tmp/old-dist-config-${ENVIRONMENT}.json
rm -f /tmp/updated-dist-config-${ENVIRONMENT}.json
