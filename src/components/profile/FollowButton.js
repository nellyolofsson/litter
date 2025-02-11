import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import './FollowButton.css';

const FollowButton = ({ profileUser, setProfileUser }) => {
  const { user, loading, token } = useContext(AuthContext); // AuthContext for user info
  const { profileId } = useParams(); // Get profileId from URL
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Check if the current user is already following the profile
    if (user && profileUser && profileUser.followers) {
      const isUserFollowing = profileUser.followers.some(follower => follower.userID === user.id);
      setIsFollowing(isUserFollowing); // Set isFollowing state based on whether the user is following or not
    }
  }, [profileUser, user]);

  const handleFollowToggle = async () => {
  if (!user || !profileUser || !profileUser.followers) return;

  const isCurrentlyFollowing = profileUser.followers.some(follower => follower.userID === user.id);

  try {
    // Make PATCH request to follow/unfollow
    const response = await fetch(`https://cscloud8-229.lnu.se/api/v1/auth/profile/${profileId}/follow`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ user: user }),
    });

    if (!response.ok) throw new Error('Failed to update followers');

    // Fetch the updated profile data after successful follow/unfollow action
    const updatedProfileData = await response.json();

    // Update parent component with the latest profile data
    setProfileUser(updatedProfileData);

    // Update isFollowing based on the updated followers list from the server
    const updatedIsFollowing = updatedProfileData.followers.some(follower => follower.userID === user.id);
    setIsFollowing(updatedIsFollowing); // Ensure the button shows the correct state

  } catch (error) {
    console.error('Error updating followers:', error);
    // Optionally handle the error
  }
};

  // Hide the follow button if it's the user's own profile or data is still loading
  if (loading || !user || user.id === profileId) return null;

  return (
    <div className="follow-button-container">
      <button className={`follow-button ${isFollowing ? 'unfollow' : 'follow'}`} onClick={handleFollowToggle}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};

export default FollowButton;
