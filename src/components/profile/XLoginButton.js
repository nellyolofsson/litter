// A button that opens the LoginModal when clicked

import React, { useState } from 'react';
import LoginModal from './XLoginModal';
import './XLoginButton.css';

const XLoginButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={handleOpenModal} className="open-login-button">
                Login
            </button>
            {isModalOpen && <LoginModal onClose={handleCloseModal} />}
        </div>
    );
}

export default XLoginButton;