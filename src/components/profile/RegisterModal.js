import React, { useState } from 'react';
import './RegisterModal.css';

const RegisterModal = ({ onClose }) => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [picture, setPicture] = useState('');

    const handleFirstnameChange = (event) => setFirstname(event.target.value);
    const handleLastnameChange = (event) => setLastname(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePictureChange = (event) => setPicture(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://cscloud8-229.lnu.se/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    picture,
                }),
            });
            const data = await response.json();
            console.log('User registered:', data);

            onClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>
                    &times;
                </button>
                <h2>Join Us</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={handleFirstnameChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={handleLastnameChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Picture URL (optional)"
                        value={picture}
                        onChange={handlePictureChange}
                    />
                    <div className="button-group">
                        <button type="submit" className="submit-button">
                            Register
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
