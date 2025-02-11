import React, { useState, useEffect, useContext } from 'react';
import './LikeButton.css'
import { AuthContext } from '../../context/AuthContext';

const LikeButton = ({ likes, setLikes, user, litter }) => {
    const [isLiked, setIsLiked] = useState(false);
    const { token } = useContext(AuthContext);
    
    useEffect(() => {
        if (user) {
        setIsLiked(likes.includes(user.id));
        }
    }, [likes, user]);
    
    const handleLike = async (event) => {
        event.preventDefault();
        if (!user) return;
    
        const previousLikes = [...likes];
        const updatedLikes = isLiked
            ? previousLikes.filter(id => id !== user.id)
            : [...previousLikes, user.id];
    
        setLikes(updatedLikes);
        setIsLiked(!isLiked);
    
        try {
            const response = await fetch(`https://cscloud8-229.lnu.se/api/v2/litter/${litter.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                 },
                body: JSON.stringify({ likes: updatedLikes }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error('Failed to like litter');
            }
        } catch (error) {
            console.error('Error liking litter:', error);
            setLikes(previousLikes);
            setIsLiked(isLiked);
            alert('Something went wrong. Please try again.');
        }
    };
    
    
    return (
        <button className="like-button" onClick={handleLike}>
            👍 <span className="like-count">{likes.length}</span>
        </button>
    );
    };

export default LikeButton;