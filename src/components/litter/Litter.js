import React, { useState, useEffect } from 'react';
import './Litter.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import EditButton from './EditButton';  // EditButton som hanterar redigeringen
import DeleteButton from './DeleteButton';

const Litter = ({ litter, onEdit, onDelete }) => {
    const [likes, setLikes] = useState(litter?.likes || []);
    const [currentDescription, setCurrentDescription] = useState(litter.description || '');
    const { user } = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Uppdatera likes och description när litter ändras
        if (litter) {
            setLikes(litter.likes);
            setCurrentDescription(litter.description);
        }
    }, [litter]);

    // Kolla om användaren är ägaren av litter
    const owner = litter?.owner || {}; 
    const isOwner = user?.id === owner.id;

    const handleClick = () => {
        if (owner.id) {
            navigate(`/profile/${owner.id}`);
        }
    };

    // Hantera när beskrivningen sparas
    const handleEditSave = (id, newDescription) => {
        setCurrentDescription(newDescription);
        if (onEdit) {
            onEdit(id, newDescription);
        }
    };

    // Hantera när en litter tas bort
    const handleDelete = () => {
        if (onDelete) {
            onDelete(litter.id);
        }
    };

    return (
        <div className="litter-container">
            <div className="litter-header">
                <img
                    src={owner.profilePhoto || '/kitty.png'}
                    alt={`${owner.firstName} ${owner.lastName}`}
                    className="profile-photo"
                />
                <div className="litter-header-text">
                    <span className="owner-link" onClick={handleClick}>
                        {owner.firstName} {owner.lastName}
                    </span>
                    <span className="litter-date">{new Date(litter.createdAt).toLocaleString()}</span>
                </div>
            </div>

            <div className="litter-description">
                <span>{currentDescription || 'No description provided.'}</span>
            </div>

            <div className="litter-footer">
                <div className="left-section">
                    <LikeButton likes={likes} setLikes={setLikes} user={user} litter={litter} />
                </div>

                <div className="right-section">
                    {isOwner && (
                        <>
                            {/* Edit and Save buttons */}
                            <EditButton litter={litter} onSave={handleEditSave} />
                            {/* Delete Button */}
                            <DeleteButton litter={litter} onDelete={handleDelete} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Litter;
