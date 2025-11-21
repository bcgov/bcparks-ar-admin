#!/bin/bash

##############################################################################
# setup-lza-admin-dev-environment.sh
#
# Sets up GitHub environment, secrets, and variables for LZA Dev deployment
# of the BC Parks A&R Admin application
#
# Prerequisites:
# - GitHub CLI installed and authenticated (gh auth login)
# - API Gateway deployed and ID obtained
# - Keycloak configured for lza-dev environment
#
# Usage:
#   ./setup-lza-admin-dev-environment.sh <api-gateway-id>
#
# Example:
#   ./setup-lza-admin-dev-environment.sh abc123def4
##############################################################################

set -e  # Exit on error
set -u  # Exit on undefined variable

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# GitHub repository
REPO="bcgov/bcparks-ar-admin"
ENVIRONMENT="lza-dev"

# AWS Configuration
AWS_ACCOUNT_ID="059942063916"
AWS_REGION="ca-central-1"
BUDGET_NUMBER="588"

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}BC Parks A&R Admin - LZA Dev GitHub Environment Setup${NC}"
echo -e "${BLUE}======================================================${NC}"
echo ""

# Check for API Gateway ID parameter
if [ $# -ne 1 ]; then
    echo -e "${RED}ERROR: API Gateway ID required${NC}"
    echo ""
    echo "Usage: $0 <api-gateway-id>"
    echo ""
    echo "Get API Gateway ID with:"
    echo "  aws apigateway get-rest-apis --profile 059942063916_BCGOV_LZA_Admin \\"
    echo "    --query 'items[?name==\`bc-parks-ar-api-lza-dev\`].id' --output text"
    exit 1
fi

API_GATEWAY_ID=$1

echo -e "${BLUE}Configuration:${NC}"
echo "Repository: ${REPO}"
echo "Environment: ${ENVIRONMENT}"
echo "AWS Account: ${AWS_ACCOUNT_ID}"
echo "API Gateway ID: ${API_GATEWAY_ID}"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v gh &> /dev/null; then
    echo -e "${RED}ERROR: GitHub CLI (gh) is not installed${NC}"
    echo "Install from: https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    echo -e "${RED}ERROR: Not authenticated with GitHub${NC}"
    echo "Run: gh auth login"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Create or update environment
echo -e "${YELLOW}Creating/updating environment '${ENVIRONMENT}'...${NC}"

# Check if environment exists
if gh api repos/${REPO}/environments/${ENVIRONMENT} &> /dev/null; then
    echo "Environment '${ENVIRONMENT}' already exists"
else
    echo "Creating environment '${ENVIRONMENT}'"
    gh api --method PUT repos/${REPO}/environments/${ENVIRONMENT}
fi

echo -e "${GREEN}✓ Environment '${ENVIRONMENT}' ready${NC}"
echo ""

# Set environment variables
echo -e "${YELLOW}Setting environment variables...${NC}"

gh variable set AWS_ACCOUNT_ID \
    --body "${AWS_ACCOUNT_ID}" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ AWS_ACCOUNT_ID"

gh variable set AWS_REGION \
    --body "${AWS_REGION}" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ AWS_REGION"

gh variable set BUDGET_NUMBER \
    --body "${BUDGET_NUMBER}" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ BUDGET_NUMBER"

gh variable set AWS_ACCOUNT_LIST \
    --body "lza-dev lza-test lza-prod" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ AWS_ACCOUNT_LIST"

gh variable set AR_API_ID \
    --body "${API_GATEWAY_ID}" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ AR_API_ID"

gh variable set API_GATEWAY_URL \
    --body "https://${API_GATEWAY_ID}.execute-api.ca-central-1.amazonaws.com/api" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ API_GATEWAY_URL"

gh variable set PUBLIC_FRONTEND \
    --body "lza-dev-ar-admin.bcparks.ca" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ PUBLIC_FRONTEND"

gh variable set KEYCLOAK_REALM \
    --body "bcparks-service-transformation" \
    --repo ${REPO} \
    --env ${ENVIRONMENT}
echo "✓ KEYCLOAK_REALM"

echo -e "${GREEN}✓ All environment variables set${NC}"
echo ""

# Set repository-level secrets (shared across environments)
echo -e "${YELLOW}Setting repository-level secrets...${NC}"

# TERRAFORM_DEPLOY_ROLE_ARN
TERRAFORM_ROLE="arn:aws:iam::${AWS_ACCOUNT_ID}:role/BCPARKS_TERRAFORM_DEPLOY"
echo "${TERRAFORM_ROLE}" | gh secret set TERRAFORM_DEPLOY_ROLE_ARN --repo ${REPO}
echo "✓ TERRAFORM_DEPLOY_ROLE_ARN"

echo -e "${GREEN}✓ Repository secrets set${NC}"
echo ""

# Manual secrets reminder
echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}MANUAL STEPS REQUIRED${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""
echo -e "${BLUE}Set the following environment-level secrets manually:${NC}"
echo ""
echo "1. KEYCLOAK_URL"
echo "   Value: Keycloak URL for lza-dev (e.g., https://lza-dev-keycloak.bcparks.ca)"
echo "   Command:"
echo "   gh secret set KEYCLOAK_URL --repo ${REPO} --env ${ENVIRONMENT}"
echo ""
echo "2. KEYCLOAK_CLIENT_ID"
echo "   Value: Keycloak client ID for AR Admin in lza-dev"
echo "   Command:"
echo "   gh secret set KEYCLOAK_CLIENT_ID --repo ${REPO} --env ${ENVIRONMENT}"
echo ""

# Summary
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✓ GitHub Environment Setup Complete${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Summary:${NC}"
echo "Environment: ${ENVIRONMENT}"
echo "API Gateway: https://${API_GATEWAY_ID}.execute-api.ca-central-1.amazonaws.com/api"
echo "Admin Domain: lza-dev-ar-admin.bcparks.ca"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Set KEYCLOAK_URL and KEYCLOAK_CLIENT_ID secrets manually (see above)"
echo "2. Deploy admin application:"
echo "   gh workflow run lza-deploy-admin-dev.yaml --repo ${REPO}"
echo "3. Setup DNS (Route53) for lza-dev-ar-admin.bcparks.ca"
echo "4. Test the application"
