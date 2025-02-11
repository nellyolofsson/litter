import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './LitterMates.css';
import { AuthContext } from '../context/AuthContext';

const fetchUsersData = async (token, setUsers) => {

    try {
        const response = await fetch('https://cscloud8-229.lnu.se/api/v1/auth/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Add token to headers
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const LitterMates = () => {
    const [users, setUsers] = useState([]);
    const { token } = useContext(AuthContext); // Get token from context

    useEffect(() => {
        fetchUsersData(token, setUsers); // Fetch with token
    }, []);

    return (
        <div className="litter-mate">
            <h2>Find Litter Mates</h2>
            <div className="litter-mate-items">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.id} className="litter-mate-item">
                            <Link to={`/profile/${user.id}`} className="litter-mate-link">
                                <img src={user.profilePhoto || '/default-avatar.png'} alt={user.username} className="profile-photo" />
                                <div className="user-info">
                                    <p>{user.firstName} {user.lastName}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No litter mates found.</p>
                )}
            </div>
        </div>
    );
};

export default LitterMates;
