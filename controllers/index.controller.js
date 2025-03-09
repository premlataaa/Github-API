import asyncHandler from 'express-async-handler';
import  axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const GITHUB_TOKEN  = process.env.GITHUB_TOKEN
const GITHUB_API_URL = process.env.GITHUB_API_URL

const githubRequest = async (url) => {
    const response = await axios.get(url, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
        },
    });
    return response.data;
};

export const Github = asyncHandler(async (req, res) => {
    try {
        const userData = await githubRequest(`${GITHUB_API_URL}/user`);
        const repos = await githubRequest(userData.repos_url);
        const githubData = {
            username: userData.login,
            name: userData.name,
            followers: userData.followers,
            following: userData.following,
            publicRepos: userData.public_repos,
            repos: repos.map(repo => ({
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                language: repo.language,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
            })),
        };
        res.status(200).json(githubData);
    } catch (error) {
        res.status(400).json({ id: 0, message: error.message });
    }
});

export const GithubWithRepo = asyncHandler(async (req, res) => {
    try {
        const { repoName } = req.params;
        if(!repoName) return res.status(404).json({id:0,message:"Please provide Repo Name"})
        const userData = await githubRequest(`${GITHUB_API_URL}/user`);
        const repoData = await githubRequest(`${GITHUB_API_URL}/repos/${userData.login}/${repoName}`);
        const repoInfo = {
            name: repoData.name,
            description: repoData.description,
            url: repoData.html_url,
            language: repoData.language,
            stars: repoData.stargazers_count,
            forks: repoData.forks_count,
            openIssues: repoData.open_issues_count,
            createdAt: repoData.created_at,
            updatedAt: repoData.updated_at,
        };

        res.status(200).json(repoInfo);
    } catch (error) {
        res.status(400).json({ id: 0, message: error.message });
    }
});

export const GithubWithIssues = asyncHandler(async (req, res) => {
    try {
        const { repoName } = req.params;
        const { title, body } = req.body;
        if(!title) return res.status(404).json({id:0,message:"Please provide Issue Title"})
        if(!body) return res.status(404).json({id:0,message:"Please provide Issue Body"})   
        const userData = await githubRequest(`${GITHUB_API_URL}/user`);
        const issueResponse = await axios.post(
            `${GITHUB_API_URL}/repos/${userData.login}/${repoName}/issues`,
            { title, body },
            {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            }
        );

        res.status(201).json({ issueUrl: issueResponse.data.html_url });
    } catch (error) {
        res.status(400).json({ id: 0, message: error.message });
    }
});