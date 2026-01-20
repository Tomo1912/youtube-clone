// API Base URL
const API_URL = window.location.origin;

// Load videos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadVideos();
    setupSearch();
});

// Load videos from API
async function loadVideos(searchQuery = '') {
    const videoGrid = document.getElementById('videoGrid');
    
    try {
        const url = searchQuery 
            ? `${API_URL}/api/videos?search=${encodeURIComponent(searchQuery)}`
            : `${API_URL}/api/videos`;
            
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        
        const videos = await response.json();
        
        if (videos.length === 0) {
            videoGrid.innerHTML = `
                <div class="loading">
                    <i class="fas fa-search"></i>
                    <p>No videos found for "${searchQuery}"</p>
                </div>
            `;
            return;
        }
        
        renderVideos(videos);
    } catch (error) {
        console.error('Error loading videos:', error);
        videoGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading videos. Please try again.</p>
            </div>
        `;
    }
}

// Render videos to the grid
function renderVideos(videos) {
    const videoGrid = document.getElementById('videoGrid');
    
    videoGrid.innerHTML = videos.map(video => `
        <div class="video-card" onclick="playVideo(${video.id})">
            <div class="thumbnail-container">
                <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                <span class="duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span>${video.channel}</span>
                    <span>${video.views} views • ${video.timestamp}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup search functionality
function setupSearch() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        loadVideos(query);
    });
}

// Play video (placeholder function)
function playVideo(videoId) {
    console.log(`Playing video ${videoId}`);
    alert(`Video player would open here for video ID: ${videoId}\n\nThis is a demo YouTube clone deployed on AWS EKS!`);
}

// Health check
async function checkHealth() {
    try {
        const response = await fetch(`${API_URL}/api/health`);
        const data = await response.json();
        console.log('Health check:', data);
    } catch (error) {
        console.error('Health check failed:', error);
    }
}

// Run health check on load
checkHealth();

