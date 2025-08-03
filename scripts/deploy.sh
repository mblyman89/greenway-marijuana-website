#!/bin/bash

# Greenway Marijuana Website Deployment Script
# This script handles the deployment process for the website

# Set colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Greenway Marijuana Website Deployment  ${NC}"
echo -e "${GREEN}=========================================${NC}"

# Check if environment argument is provided
if [ -z "$1" ]; then
  echo -e "${RED}Error: Please specify environment (staging or production)${NC}"
  echo "Usage: ./scripts/deploy.sh [staging|production]"
  exit 1
fi

ENVIRONMENT=$1

# Validate environment
if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
  echo -e "${RED}Error: Invalid environment. Use 'staging' or 'production'${NC}"
  exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
  npm install -g vercel
fi

# Step 1: Run tests
echo -e "\n${YELLOW}Step 1: Running tests...${NC}"
npm run lint
if [ $? -ne 0 ]; then
  echo -e "${RED}Linting failed. Aborting deployment.${NC}"
  exit 1
fi

npm run test
if [ $? -ne 0 ]; then
  echo -e "${RED}Tests failed. Aborting deployment.${NC}"
  exit 1
fi

# Step 2: Build the application
echo -e "\n${YELLOW}Step 2: Building the application...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}Build failed. Aborting deployment.${NC}"
  exit 1
fi

# Step 3: Deploy to the specified environment
echo -e "\n${YELLOW}Step 3: Deploying to $ENVIRONMENT...${NC}"
if [ "$ENVIRONMENT" == "production" ]; then
  # For production, ask for confirmation
  echo -e "${RED}WARNING: You are about to deploy to PRODUCTION.${NC}"
  read -p "Are you sure you want to continue? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled.${NC}"
    exit 0
  fi
  
  # Deploy to production
  npm run deploy:production
else
  # Deploy to staging
  npm run deploy:staging
fi

if [ $? -ne 0 ]; then
  echo -e "${RED}Deployment failed.${NC}"
  exit 1
fi

# Step 4: Verify the deployment
echo -e "\n${YELLOW}Step 4: Verifying deployment...${NC}"

# Get the deployment URL
if [ "$ENVIRONMENT" == "production" ]; then
  DEPLOY_URL="https://greenwaymarijuana.com"
else
  DEPLOY_URL="https://staging.greenwaymarijuana.com"
fi

echo -e "Waiting for deployment to finalize..."
sleep 10

# Run verification script
node scripts/deploy-verification.js $DEPLOY_URL
if [ $? -ne 0 ]; then
  echo -e "${RED}Verification failed. Please check the deployment manually.${NC}"
  exit 1
fi

# Step 5: Finalize
echo -e "\n${GREEN}Deployment to $ENVIRONMENT completed successfully!${NC}"
echo -e "Deployment URL: ${YELLOW}$DEPLOY_URL${NC}"
echo -e "\n${GREEN}=========================================${NC}"

exit 0