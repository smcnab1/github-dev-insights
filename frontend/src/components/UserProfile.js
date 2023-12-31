// src/UserProfile.js
import React, { useState } from 'react';
import { getUserDetails } from '../GitHubAPI';
import './UserProfile.css'; // Import the stylesheet

function UserProfile() {
  const [username, setUsername] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const user = await getUserDetails(username);
      setUserDetails(user);
      setError(null);
    } catch (error) {
      setUserDetails(null);
      setError('User not found');
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {userDetails && (
        <div className="user-details">
          <img className="avatar" src={userDetails.avatar_url} alt="User Avatar" />
          <p className="name">{userDetails.name}</p>
          <p className="bio">{userDetails.bio}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
