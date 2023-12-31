// src/components/RepoList.js
import React, { useEffect, useState } from 'react';
import { getUserRepos } from '../GitHubAPI';
import './RepoList.css';

function RepoList() {
    const [username, setUsername] = useState('');
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
        const userRepos = await getUserRepos(username);
        setRepos(userRepos);
        setError(null);
        } catch (error) {
        setRepos([]);
        setError('Error fetching repositories');
        }
    };

    return (
        <div>
        <h2>GitHub Repositories</h2>
        <div>
            <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
            {repos.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
            ))}
        </ul>
        </div>
    );
    }

export default RepoList;