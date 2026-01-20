#!/bin/bash

# YouTube Clone - AWS EKS Deployment Script
# This script automates the deployment process to minimize costs

set -e

echo "🚀 YouTube Clone - AWS EKS Deployment"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
CLUSTER_NAME=${CLUSTER_NAME:-youtube-clone-cluster}
DOCKER_USERNAME=${DOCKER_USERNAME:-your_dockerhub_username}

# Function to print colored output
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check prerequisites
print_info "Checking prerequisites..."

if ! command -v terraform &> /dev/null; then
    print_error "Terraform is not installed. Please install it first."
    exit 1
fi

if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed. Please install it first."
    exit 1
fi

if ! command -v aws &> /dev/null; then
    print_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

print_info "All prerequisites met!"
echo ""

# Step 1: Initialize Terraform
print_info "Step 1: Initializing Terraform..."
cd terraform/eks
terraform init
echo ""

# Step 2: Plan Terraform
print_info "Step 2: Planning Terraform deployment..."
terraform plan -out=tfplan
echo ""

# Step 3: Apply Terraform
print_warning "This will create AWS resources and incur costs (~$0.10/hour)"
read -p "Do you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    print_error "Deployment cancelled."
    exit 1
fi

print_info "Step 3: Applying Terraform configuration..."
START_TIME=$(date +%s)
terraform apply tfplan
echo ""

# Step 4: Configure kubectl
print_info "Step 4: Configuring kubectl..."
aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME
echo ""

# Step 5: Wait for nodes to be ready
print_info "Step 5: Waiting for nodes to be ready..."
kubectl wait --for=condition=Ready nodes --all --timeout=300s
echo ""

# Step 6: Deploy application
print_info "Step 6: Deploying application to EKS..."
cd ../..
kubectl apply -f kubernetes/
echo ""

# Step 7: Wait for deployment
print_info "Step 7: Waiting for deployment to be ready..."
kubectl rollout status deployment/youtube-clone --timeout=300s
echo ""

# Step 8: Get service information
print_info "Step 8: Getting service information..."
kubectl get pods
kubectl get services
echo ""

LOAD_BALANCER=$(kubectl get svc youtube-clone-service -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
print_info "Application URL: http://$LOAD_BALANCER"
echo ""

# Calculate elapsed time
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
COST=$(echo "scale=2; $ELAPSED / 3600 * 0.10" | bc)

print_info "Deployment completed in $ELAPSED seconds"
print_warning "Estimated cost so far: \$$COST"
echo ""

print_warning "⚠️  IMPORTANT: Don't forget to destroy resources when done!"
print_info "Run: ./destroy-eks.sh"
echo ""

