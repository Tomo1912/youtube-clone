#!/bin/bash

# YouTube Clone - AWS EKS Destroy Script
# This script destroys all AWS resources to stop costs

set -e

echo "🗑️  YouTube Clone - AWS EKS Cleanup"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
AWS_REGION=${AWS_REGION:-us-east-1}
CLUSTER_NAME=${CLUSTER_NAME:-youtube-clone-cluster}

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

print_warning "⚠️  This will DELETE all AWS resources!"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    print_error "Cleanup cancelled."
    exit 1
fi

# Step 1: Delete Kubernetes resources
print_info "Step 1: Deleting Kubernetes resources..."
kubectl delete -f kubernetes/ --ignore-not-found=true || true
echo ""

# Step 2: Wait for LoadBalancer to be deleted
print_info "Step 2: Waiting for LoadBalancer to be deleted..."
sleep 30
echo ""

# Step 3: Destroy Terraform resources
print_info "Step 3: Destroying Terraform resources..."
cd terraform/eks
terraform destroy -auto-approve
echo ""

print_info "✅ All resources have been destroyed!"
print_info "💰 Costs have been stopped."
echo ""

