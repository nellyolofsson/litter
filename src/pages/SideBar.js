import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/profile/LogoutButton';
import './SideBar.css';

const SideBar = ({ user }) => {
    const navigate = useNavigate();
    const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '/kitty.png');
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Toggle sidebar collapse state
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    }

    // Update profile photo if user changes
    useEffect(() => {
        setProfilePhoto(user?.profilePhoto || '/kitty.png');
    }, [user]);

    const handleProfileClick = () => {
        navigate(`/profile/${user.id}`);
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleLitterMatesClick = () => {
        navigate('/littermates');
    }

    return (
        <>
            {/* Toggle Button for collapsing/expanding sidebar */}
            <button
                className="sidebar-toggle-button"
                onClick={toggleSidebar}
                aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
                {isCollapsed ? '×' : '☰'}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <h1 className="sidebar-home-link" onClick={handleHomeClick}>
                    Litter
                </h1>
                <div className="sidebar-profile">
                    <img
                        src={profilePhoto}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="profile-photo"
                        onClick={handleProfileClick}
                    />
                    <p className="sidebar-username">{user.firstName} {user.lastName}</p>
                </div>
                <div className="sidebar-links">
                    <button onClick={handleLitterMatesClick} className="sidebar-link">LitterMates</button>
                    <button onClick={handleProfileClick} className="sidebar-link">Profile</button>
                    <button onClick={handleHomeClick} className="sidebar-link">Home</button>
                </div>
                {/* LogoutButton only visible when sidebar is expanded */}
                {!isCollapsed && <LogoutButton />}
            </div>
        </>
    );

}

export default SideBar;
