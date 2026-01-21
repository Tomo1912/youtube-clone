# 🎥 YouTube Clone - AWS EKS Deployment

[![CI/CD Pipeline](https://github.com/Tomo1912/YouTube-clone/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Tomo1912/YouTube-clone/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready YouTube clone application deployed on **AWS EKS (Elastic Kubernetes Service)** with complete CI/CD pipeline, security scanning, and infrastructure as code.

## 📌 Project Overview

This project demonstrates enterprise-grade DevOps practices including:
- ✅ Containerized Node.js application
- ✅ Automated CI/CD with GitHub Actions
- ✅ Infrastructure as Code with Terraform
- ✅ Kubernetes orchestration on AWS EKS
- ✅ Security scanning with Trivy
- ✅ Code quality analysis with SonarQube
- ✅ Auto-scaling and high availability

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│  (Source Code + Terraform + Kubernetes Manifests)           │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Push/PR
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   GitHub Actions CI/CD                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Build   │→ │  Test    │→ │ Security │→ │  Deploy  │   │
│  │          │  │          │  │  Scan    │  │  to EKS  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Push Image
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      DockerHub Registry                      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  │ Pull Image
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                        AWS EKS Cluster                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Kubernetes Deployment                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  Pod 1   │  │  Pod 2   │  │  Pod N   │           │  │
│  │  │ (App)    │  │ (App)    │  │ (App)    │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  │                                                       │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         LoadBalancer Service                 │   │  │
│  │  └──────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Tech Stack

### **Application**
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Runtime**: Node.js 18

### **DevOps & Infrastructure**
- **Containerization**: Docker
- **Orchestration**: Kubernetes (AWS EKS)
- **IaC**: Terraform
- **CI/CD**: GitHub Actions
- **Registry**: DockerHub
- **Cloud Provider**: AWS

### **Security & Quality**
- **Security Scanning**: Trivy (filesystem + image)
- **Code Quality**: SonarQube/SonarCloud
- **Secrets Management**: GitHub Secrets

---

## 📋 Prerequisites

Before deploying, ensure you have:

- [x] AWS Account with appropriate permissions
- [x] AWS CLI installed and configured
- [x] Terraform >= 1.0
- [x] kubectl installed
- [x] Docker installed (for local testing)
- [x] DockerHub account
- [x] GitHub account

---

## 🛠️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/Tomo1912/YouTube-clone.git
cd YouTube-clone
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm start
```

Visit: `http://localhost:3000`

### 4. Test with Docker
```bash
docker-compose up --build
```

---

## ☁️ AWS EKS Deployment

### **Quick Deploy (30 minutes)**

This deployment is optimized for minimal cost (~$0.10 for demo).

#### 1. Configure AWS credentials
```bash
aws configure
```

#### 2. Set environment variables
```bash
export AWS_REGION=us-east-1
export CLUSTER_NAME=youtube-clone-cluster
export DOCKER_USERNAME=your_dockerhub_username
```

#### 3. Update Kubernetes manifests
Edit `kubernetes/deployment.yaml` and replace `YOUR_DOCKERHUB_USERNAME` with your actual username.

#### 4. Deploy to EKS
```bash
./deploy-eks.sh
```

This script will:
- ✅ Initialize Terraform
- ✅ Create VPC, subnets, and networking
- ✅ Create EKS cluster
- ✅ Create node group
- ✅ Configure kubectl
- ✅ Deploy application
- ✅ Show application URL

#### 5. Access your application
```bash
kubectl get svc youtube-clone-service
```

Copy the LoadBalancer URL and open in browser.

---

## 🗑️ Cleanup (IMPORTANT!)

**To avoid ongoing costs, destroy all resources:**

```bash
./destroy-eks.sh
```

This will:
- Delete Kubernetes resources
- Destroy EKS cluster
- Remove VPC and networking
- Stop all costs

---

## 🔐 GitHub Secrets Configuration

For CI/CD to work, configure these secrets in GitHub:

| Secret Name | Description |
|-------------|-------------|
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `DOCKER_USERNAME` | DockerHub username |
| `DOCKER_PASSWORD` | DockerHub password/token |
| `SONAR_TOKEN` | SonarCloud token (optional) |

**Path**: Repository → Settings → Secrets and variables → Actions

---

## 📊 Monitoring & Observability

### View pods
```bash
kubectl get pods
```

### View logs
```bash
kubectl logs -f deployment/youtube-clone
```

### View metrics
```bash
kubectl top pods
kubectl top nodes
```

### Describe deployment
```bash
kubectl describe deployment youtube-clone
```

---

## 💰 Cost Estimation

| Resource | Cost (per hour) | Cost (24h) |
|----------|----------------|------------|
| EKS Control Plane | $0.10 | $2.40 |
| t3.small nodes (2x) | $0.042 | $1.01 |
| LoadBalancer | $0.025 | $0.60 |
| **Total** | **~$0.17/hr** | **~$4.00/day** |

**Demo deployment (30 min)**: ~$0.10

---

## 🎯 Why EKS is Offline

⚠️ **The EKS cluster is currently deactivated to avoid ongoing AWS costs (~$120/month).**

This project was deployed on **2026-01-21** for demonstration purposes:
- ✅ Cluster was active for 30 minutes
- ✅ Application was fully functional
- ✅ All screenshots and videos were captured
- ✅ Resources were destroyed to stop costs

**All deployment configurations, Terraform code, and Kubernetes manifests are preserved in this repository and can be redeployed at any time.**

---

## 📸 Screenshots & Evidence

See the `/docs/screenshots/` directory for:
- EKS cluster dashboard
- Running pods and services
- Application UI
- CI/CD pipeline execution
- Security scan results

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 🎯 Live Deployment

### Application URL
🌐 **http://adf095793b3fe401e97a14d20d471d5a-1953189031.us-east-1.elb.amazonaws.com**

### Deployment Proof

**Kubernetes Resources:**
```
NAME                                READY   STATUS    RESTARTS   AGE
pod/youtube-clone-c8c94b86d-dbzvn   1/1     Running   0          7m
pod/youtube-clone-c8c94b86d-p4bkb   1/1     Running   0          6m

NAME                            TYPE           CLUSTER-IP      EXTERNAL-IP                                                               PORT(S)
service/youtube-clone-service   LoadBalancer   172.20.228.24   adf095793b3fe401e97a14d20d471d5a-1953189031.us-east-1.elb.amazonaws.com   80:30612/TCP
```

**Health Check Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-21T12:15:09.118Z",
  "service": "YouTube Clone API"
}
```

**Docker Image:** `410293310465.dkr.ecr.us-east-1.amazonaws.com/youtube-clone:latest`

### Screenshots

<img width="1920" height="1011" alt="Screenshot 2026-01-21 at 14 03 07" src="https://github.com/user-attachments/assets/f2d91e04-0636-4c10-8bb2-6dd8d3b254f9" />

<img width="1169" height="164" alt="Screenshot 2026-01-21 at 14 03 27" src="https://github.com/user-attachments/assets/35ea95a9-a11d-484e-9ca2-beb5e1de36a7" />

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Inspired by modern DevOps practices
- Built with enterprise-grade tools and technologies
- Optimized for cost-effective cloud deployment

---

**⭐ If you found this project helpful, please give it a star!**

