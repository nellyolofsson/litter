import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';
import './Profile.css';
import LitterListUser from '../litter/LitterListUser.js';
import FollowButton from './FollowButton';  // Importera FollowButton

function Profile() {
  const { token } = useContext(AuthContext); // AuthContext för att få tillgång till inloggad användare
  const { profileId } = useParams(); // Hämta profil-ID från URL
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState({
    followers: [],
    following: []
  });
  const [isLoading, setIsLoading] = useState(true); // Local loading state for profile data

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Check if profile data is already loaded before fetching
        if (profileUser.id === profileId) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`https://cscloud8-229.lnu.se/api/v1/auth/profile/${profileId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();

        // Säkerställ att followers och following alltid är en array
        const updatedData = {
          ...data,
          followers: data.followers || [],  // Om det inte finns någon followers, sätt till en tom array
          following: data.following || []   // Om det inte finns någon following, sätt till en tom array
        };

        setProfileUser(updatedData); // Sätt profilens data i state
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProfileData();
  }, [profileId, token, profileUser.id]); // Fetch only when profileId or token changes

  // Hantera laddning eller obefintlig användare
  if (isLoading || !profileUser || !profileUser.followers) {
    return (
      <div className="profile-container">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  const handleShowFollowers = () => {
    navigate(`/profile/${profileUser.id}/followers`);
  };

  return (
    <div className="profile-container">
      {/* Left Column: Profile Section */}
      <div className="profile-photo-container">
        {profileUser.profilePhoto ? (
          <img className="profile-photo" src={profileUser.profilePhoto} alt="Profile" />
        ) : (
          <img className="profile-photo" src="/kitty.png" alt="Default Profile" />
        )}
        <div className="profile-info">
          <h1>{profileUser.firstName} {profileUser.lastName}</h1>
          <p>{profileUser.email}</p>
          <p className="profile-followers-text">
            <span
              onClick={handleShowFollowers}
            >
              Followers: {profileUser.followers ? profileUser.followers.length : 0}
            </span>
          </p>
          <FollowButton profileUser={profileUser} setProfileUser={setProfileUser} />
        </div>
      </div>

      {/* Middle Column: Litters Section */}
      <div className="profile-content">
        <h2>Litters</h2>
        <LitterListUser profileId={profileId} />
      </div>
    </div>
  );
}

export default Profile;
