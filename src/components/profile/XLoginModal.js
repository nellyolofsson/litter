// A login button that opens a login form when clicked
// The login form contains fields for email and password
// The login form also contains a button to submit the form that sends a POST request to the server
// The login form also contains a button to close the form

import React, { useState } from 'react';
import './XLoginButton.css';

const LoginModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://cscloud8-229.lnu.se/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            console.log('User logged in:', data);

            onClose(); // Close the modal after submission
        } catch (error) {
            console.error('Error logging in user:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>
                    &times;
                </button>
                <h2>Welcome Back</h2>
                <form onSubmit={handleSubmit} className="login-form">
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
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;

