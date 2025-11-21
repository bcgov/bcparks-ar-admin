#!/bin/bash

##############################################################################
# post-deploy-lza-dev.sh
#
# Post-deployment tasks for BC Parks A&R Admin in LZA Dev
# This script handles DNS configuration and final verification
#
# Prerequisites:
# - API and Admin successfully deployed
# - AWS CLI configured with 'parksweb' profile for Route53 access
# - CloudFront distribution created by SAM deployment
#
# Usage:
#   ./post-deploy-lza-dev.sh
##############################################################################

set -e  # Exit on error
set -u  # Exit on undefined variable

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ADMIN_DOMAIN="lza-dev-ar-admin.bcparks.ca"
API_DOMAIN="lza-dev-ar.bcparks.ca"
HOSTED_ZONE_NAME="bcparks.ca"
AWS_PROFILE_ROUTE53="parksweb"
AWS_PROFILE_LZA="059942063916_BCGOV_LZA_Admin"
AWS_REGION="ca-central-1"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}BC Parks A&R - LZA Dev Post-Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v aws &> /dev/null; then
    echo -e "${RED}ERROR: AWS CLI is not installed${NC}"
    exit 1
fi

# Verify parksweb profile exists
if ! aws sts get-caller-identity --profile ${AWS_PROFILE_ROUTE53} &> /dev/null; then
    echo -e "${RED}ERROR: AWS profile '${AWS_PROFILE_ROUTE53}' not configured or not authenticated${NC}"
    echo "This profile is needed for Route53 (DNS) management"
    exit 1
fi

# Verify lza profile exists
if ! aws sts get-caller-identity --profile ${AWS_PROFILE_LZA} &> /dev/null; then
    echo -e "${RED}ERROR: AWS profile '${AWS_PROFILE_LZA}' not configured or not authenticated${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Get CloudFront distribution IDs
echo -e "${YELLOW}Getting CloudFront distribution information...${NC}"

ADMIN_DIST_ID=$(aws cloudfront list-distributions \
    --profile ${AWS_PROFILE_LZA} \
    --query "DistributionList.Items[?Comment=='bc-parks-ar-admin-lza-dev'].Id" \
    --output text)

API_DIST_ID=$(aws cloudfront list-distributions \
    --profile ${AWS_PROFILE_LZA} \
    --query "DistributionList.Items[?Comment=='bc-parks-ar-api-lza-dev'].Id" \
    --output text)

if [ -z "$ADMIN_DIST_ID" ]; then
    echo -e "${RED}ERROR: Could not find CloudFront distribution for admin${NC}"
    echo "Distribution comment should be: bc-parks-ar-admin-lza-dev"
    exit 1
fi

if [ -z "$API_DIST_ID" ]; then
    echo -e "${RED}ERROR: Could not find CloudFront distribution for API${NC}"
    echo "Distribution comment should be: bc-parks-ar-api-lza-dev"
    exit 1
fi

echo "Admin Distribution ID: ${ADMIN_DIST_ID}"
echo "API Distribution ID: ${API_DIST_ID}"
echo ""

# Get CloudFront domain names
ADMIN_CF_DOMAIN=$(aws cloudfront get-distribution \
    --id ${ADMIN_DIST_ID} \
    --profile ${AWS_PROFILE_LZA} \
    --query 'Distribution.DomainName' \
    --output text)

API_CF_DOMAIN=$(aws cloudfront get-distribution \
    --id ${API_DIST_ID} \
    --profile ${AWS_PROFILE_LZA} \
    --query 'Distribution.DomainName' \
    --output text)

echo "Admin CloudFront: ${ADMIN_CF_DOMAIN}"
echo "API CloudFront: ${API_CF_DOMAIN}"
echo ""

# Get Route53 hosted zone ID
echo -e "${YELLOW}Getting Route53 hosted zone...${NC}"

HOSTED_ZONE_ID=$(aws route53 list-hosted-zones \
    --profile ${AWS_PROFILE_ROUTE53} \
    --query "HostedZones[?Name=='${HOSTED_ZONE_NAME}.'].Id" \
    --output text | cut -d'/' -f3)

if [ -z "$HOSTED_ZONE_ID" ]; then
    echo -e "${RED}ERROR: Could not find Route53 hosted zone for ${HOSTED_ZONE_NAME}${NC}"
    exit 1
fi

echo "Hosted Zone ID: ${HOSTED_ZONE_ID}"
echo ""

# Create DNS records
echo -e "${YELLOW}Creating Route53 DNS records...${NC}"

# Create admin CNAME record
cat > /tmp/admin-dns-change.json <<EOF
{
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${ADMIN_DOMAIN}",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "${ADMIN_CF_DOMAIN}"
          }
        ]
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets \
    --profile ${AWS_PROFILE_ROUTE53} \
    --hosted-zone-id ${HOSTED_ZONE_ID} \
    --change-batch file:///tmp/admin-dns-change.json \
    --no-cli-pager

echo -e "${GREEN}✓ Created DNS record: ${ADMIN_DOMAIN} -> ${ADMIN_CF_DOMAIN}${NC}"

# Create API CNAME record
cat > /tmp/api-dns-change.json <<EOF
{
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "${API_DOMAIN}",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [
          {
            "Value": "${API_CF_DOMAIN}"
          }
        ]
      }
    }
  ]
}
EOF

aws route53 change-resource-record-sets \
    --profile ${AWS_PROFILE_ROUTE53} \
    --hosted-zone-id ${HOSTED_ZONE_ID} \
    --change-batch file:///tmp/api-dns-change.json \
    --no-cli-pager

echo -e "${GREEN}✓ Created DNS record: ${API_DOMAIN} -> ${API_CF_DOMAIN}${NC}"
echo ""

# Clean up temp files
rm -f /tmp/admin-dns-change.json /tmp/api-dns-change.json

# Wait for DNS propagation
echo -e "${YELLOW}DNS records created. Waiting for propagation (this may take a few minutes)...${NC}"
echo ""

# Test DNS resolution
echo -e "${YELLOW}Testing DNS resolution...${NC}"
sleep 10  # Give DNS a moment to start propagating

ADMIN_RESOLVED=$(dig +short ${ADMIN_DOMAIN} | head -n1 || echo "")
API_RESOLVED=$(dig +short ${API_DOMAIN} | head -n1 || echo "")

if [ -n "$ADMIN_RESOLVED" ]; then
    echo -e "${GREEN}✓ Admin DNS resolves to: ${ADMIN_RESOLVED}${NC}"
else
    echo -e "${YELLOW}⚠ Admin DNS not yet propagated (this is normal, wait a few minutes)${NC}"
fi

if [ -n "$API_RESOLVED" ]; then
    echo -e "${GREEN}✓ API DNS resolves to: ${API_RESOLVED}${NC}"
else
    echo -e "${YELLOW}⚠ API DNS not yet propagated (this is normal, wait a few minutes)${NC}"
fi

echo ""

# Summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ Post-deployment Complete${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}LZA Dev Environment URLs:${NC}"
echo "Admin: https://${ADMIN_DOMAIN}"
echo "API:   https://${API_DOMAIN}"
echo ""
echo -e "${BLUE}CloudFront Distributions:${NC}"
echo "Admin: ${ADMIN_DIST_ID}"
echo "API:   ${API_DIST_ID}"
echo ""
echo -e "${YELLOW}Important Notes:${NC}"
echo "1. DNS propagation may take 5-15 minutes"
echo "2. CloudFront distributions may take up to 20 minutes to fully deploy"
echo "3. SSL certificates should be automatically provisioned by CloudFront"
echo ""
echo -e "${BLUE}Verification Steps:${NC}"
echo "1. Wait 10-15 minutes for DNS and CloudFront to fully propagate"
echo "2. Visit https://${ADMIN_DOMAIN} to verify admin loads"
echo "3. Test authentication flow"
echo "4. Verify API connectivity from admin"
echo "5. Check CloudFormation stacks:"
echo "   aws cloudformation list-stacks --profile ${AWS_PROFILE_LZA} --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE"
echo ""
echo -e "${BLUE}Monitoring:${NC}"
echo "- CloudWatch Logs: /aws/lambda/bc-parks-ar-*-lza-dev"
echo "- API Gateway Logs: Check API Gateway console"
echo "- CloudFront: Check distribution settings and behaviors"
