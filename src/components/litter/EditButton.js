import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const EditButton = ({ litter, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newDescription, setNewDescription] = useState(litter.description || '');
    const [isSaving, setIsSaving] = useState(false); // Indikera när sparning pågår
    const { token } = useContext(AuthContext);

    // Hantera redigeringens toggling
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setNewDescription(litter.description); // Resetta beskrivningen om man avbryter redigeringen
    };

    // Funktion för att uppdatera litterbeskrivning via API
    const updateLitter = async (id, newDescription) => {
        try {
            setIsSaving(true);
            const response = await fetch(`https://cscloud8-229.lnu.se/api/v2/litter/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ description: newDescription }),
            });

            if (response.ok) {
                console.log('Litter updated successfully');
            } else {
                console.error('Failed to update litter');
            }
        } catch (error) {
            console.error('Error updating litter:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Hantera spara när användaren är klar
    const handleSave = () => {
        if (newDescription.trim() === '') {
            alert('Description cannot be empty!');
            return;
        }

        if (onSave) {
            onSave(litter.id, newDescription); // Skicka den nya beskrivningen till föräldrakomponenten
        }
        updateLitter(litter.id, newDescription); // Uppdatera litter via API
        setIsEditing(false);
    };

    return (
        <div className="edit-actions">
        {isEditing ? (
            <>
                <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                />
                <button className="save-button" onClick={handleSave} disabled={isSaving} title="Save">
                    💾
                </button>
                <button className="cancel-button" onClick={handleEditToggle} disabled={isSaving} title="Cancel">
                    ❌
                </button>
            </>
        ) : (
            <button className="edit-button" onClick={handleEditToggle} title="Edit">
                ✏️
            </button>
        )}
    </div>
    
    );
};

export default EditButton;
