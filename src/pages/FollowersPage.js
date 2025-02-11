import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './FollowersPage.css';
import { AuthContext } from '../context/AuthContext';

const FollowersPage = () => {
  const { profileId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://cscloud8-229.lnu.se/api/v1/auth/profile/${profileId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [profileId]);

  return (
    <div className="followers-page-container">
      <h1>{profileData ? `${profileData.firstName}'s Followers` : 'Followers'}</h1>

      {profileData ? (
        <ul className="followers-list">
          {profileData.followers.length > 0 ? (
            profileData.followers.map((follower) => (
              <li key={follower.userID} className="follower-item">
                <img
                  src={follower.followerPic || '/kitty.png'}
                  alt={`${follower.followerName}'s profile`}
                  className="profile-photo"
                />
                <div className="follower-details">
                  <Link to={`/profile/${follower.userID}`} className="follower-name">
                    {follower.followerName} {follower.followerLastName}
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p className="no-followers">No followers yet.</p>
          )}
        </ul>
      ) : (
        <p className="loading-text">Loading profile data...</p>
      )}
      <Link to={`/profile/${profileId}`} className="link-back">Back to Profile</Link>
    </div>
  );
};

export default FollowersPage;
