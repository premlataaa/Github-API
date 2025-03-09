# GitHub API Integration

A scalable REST API service that integrates with GitHub's API to fetch user data, repository details, and create issues.

## 🚀 Key Features

- *Scalable Architecture* - Built with clustering for performance optimization
- *MVC Structure* - Clean separation of concerns for maintainability
- *Environment-Based Configuration* - Easily switch between development/production
- *Clean, Modular Code* - Following best practices and design patterns

## 📋 API Endpoints

### 1. Get GitHub User Data
**GET /github**

Fetches comprehensive user profile including:
- Username and name
- Follower/following counts
- Complete repository list with details

### 2. Get Repository Details
**GET /github/{repo-name}**

Retrieves detailed information about a specific repository:
- Repository metadata (name, description)
- Statistics (stars, forks, open issues)
- Technical details (language, creation/update dates)

### 3. Create Repository Issue
**POST /github/{repo-name}/issues**

Creates a new issue in the specified repository:
- Requires title and description
- Returns the URL of the created issue

## ⚙ Technical Stack

- *Node.js & Express* - Fast, non-blocking I/O
- *GitHub REST API* - Direct integration with GitHub services
- *Environment Variables* - Secure configuration management

## 🔧 Setup Instructions

### Prerequisites
- Node.js v16 or higher
- GitHub Personal Access Token (with repo and user scopes)

### Installation

1. *Clone the repository*
   bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   

2. *Install dependencies*
   bash
   npm install
   

3. *Configure environment*
   bash
   # Create .env file
   echo "GITHUB_TOKEN=your_github_personal_access_token" > .env
   

4. *Start the application*
   bash
   npm start
   

The API will be accessible at http://localhost:3000

## 🌐 Deployed API

All endpoints are available at: https://api.github-integration.com/v1

## 📝 API Examples

### Fetch GitHub User Data
bash
curl https://api.github-integration.com/v1/github


### Fetch Repository Details
bash
curl https://api.github-integration.com/v1/github/repo-name


### Create an Issue
bash
curl -X POST https://api.github-integration.com/v1/github/repo-name/issues \
-H "Content-Type: application/json" \
-d '{"title": "Bug in feature X", "body": "Detailed description"}'


## 📈 Performance Benefits

- *Clustering* - Utilizes all CPU cores for optimal performance
- *Caching* - Reduces redundant API calls to GitHub
- *Connection Pooling* - Efficient resource management

## 📜 License

This project is licensed under the MIT License.