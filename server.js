const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock video data (simulating YouTube API)
const mockVideos = [
  {
    id: 1,
    title: "AWS EKS Tutorial - Complete Guide",
    channel: "DevOps Academy",
    views: "125K",
    timestamp: "2 days ago",
    thumbnail: "https://picsum.photos/320/180?random=1",
    duration: "15:30"
  },
  {
    id: 2,
    title: "Kubernetes Deployment Best Practices",
    channel: "Cloud Native",
    views: "89K",
    timestamp: "1 week ago",
    thumbnail: "https://picsum.photos/320/180?random=2",
    duration: "22:15"
  },
  {
    id: 3,
    title: "Docker Containerization Masterclass",
    channel: "Tech Tutorials",
    views: "234K",
    timestamp: "3 days ago",
    thumbnail: "https://picsum.photos/320/180?random=3",
    duration: "18:45"
  },
  {
    id: 4,
    title: "Terraform Infrastructure as Code",
    channel: "DevOps Pro",
    views: "156K",
    timestamp: "5 days ago",
    thumbnail: "https://picsum.photos/320/180?random=4",
    duration: "25:10"
  },
  {
    id: 5,
    title: "CI/CD Pipeline with GitHub Actions",
    channel: "Automation Hub",
    views: "98K",
    timestamp: "1 day ago",
    thumbnail: "https://picsum.photos/320/180?random=5",
    duration: "12:30"
  },
  {
    id: 6,
    title: "Microservices Architecture Explained",
    channel: "System Design",
    views: "312K",
    timestamp: "2 weeks ago",
    thumbnail: "https://picsum.photos/320/180?random=6",
    duration: "30:20"
  }
];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'YouTube Clone API'
  });
});

app.get('/api/videos', (req, res) => {
  const { search } = req.query;
  
  if (search) {
    const filtered = mockVideos.filter(video => 
      video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.channel.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(filtered);
  }
  
  res.json(mockVideos);
});

app.get('/api/videos/:id', (req, res) => {
  const video = mockVideos.find(v => v.id === parseInt(req.params.id));
  
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }
  
  res.json(video);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 YouTube Clone server running on port ${PORT}`);
  console.log(`📺 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;

