import React, { useState, useContext } from 'react';
import './LitterCreateModal.css';
import { AuthContext } from '../../context/AuthContext';

const LitterCreateModal = ({ onClose, user }) => {
    const [description, setDescription] = useState('');
    const { token } = useContext(AuthContext);
    const handleContentChange = (event) => setDescription(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://cscloud8-229.lnu.se/api/v2/litter/create', {
                method: 'POST',
                credentials : 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    description,
                    owner: user,
                 }),
            });
            const data = await response.json();

            onClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error creating litter:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>
                    &times;
                </button>
                <h2>Create a New Litter</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <textarea
                            placeholder="What's on your mind? 💭"
                            value={description}
                            onChange={handleContentChange}
                            rows="4"
                        />
                    </label>
                    <button type="submit" className="submit-button">
                        Create
                    </button>
                    {/* Add a cancel button */}
                    <button type="button" className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LitterCreateModal;
