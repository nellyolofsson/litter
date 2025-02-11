import React, { useState } from 'react';
import RegisterModal from './RegisterModal';
import './RegisterModal.css';

const RegisterButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={handleOpenModal} className="open-register-button">
                Register
            </button>
            {isModalOpen && <RegisterModal onClose={handleCloseModal} />}
        </div>
    );
};

export default RegisterButton;
