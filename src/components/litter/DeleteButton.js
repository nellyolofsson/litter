import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DeleteButton = ({ litter, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { token } = useContext(AuthContext);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`https://cscloud8-229.lnu.se/api/v2/litter/${litter.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                console.log('Litter deleted successfully');
                onDelete(litter.id); // Informera föräldrakomponenten om borttagningen
            } else {
                console.error('Failed to delete litter');
                alert('Failed to delete litter. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting litter:', error);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            className="delete-button"
            onClick={handleDelete}
            disabled={isDeleting}
            title="Delete"
        >
            {isDeleting ? '⌛' : '🗑️'}
        </button>
    );
};

export default DeleteButton;
