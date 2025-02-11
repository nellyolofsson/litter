import React, { useState, useEffect, useContext } from 'react';
import Litter from './Litter';
import './LitterList.css';
import { LittersContext } from '../../context/LittersContext';
import { AuthContext } from '../../context/AuthContext';

const LitterList = () => {
    const { litters, updateLitter, deleteLitter } = useContext(LittersContext); // Now this will have all methods
    const { user } = useContext(AuthContext);
    
    const [sortedLitters, setSortedLitters] = useState([]);

    useEffect(() => {
        if (Array.isArray(litters) && user) {
            const filteredLitters = litters.filter((litter) =>
                Array.isArray(user.following) &&
                (
                    user.following.some((following) => following.userID === litter.owner?.id) ||
                    litter.owner?.id === user.id
                )
            ).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            setSortedLitters(filteredLitters);
        }
    }, [litters, user]);

    const handleEdit = (id, newDescription) => {
        updateLitter(id, newDescription); // This should work now
    };

    const handleDelete = (id) => {
        deleteLitter(id); // This should work now
    };

    return (
        <div className="litter-list">
            {sortedLitters.length > 0 ? (
                <div className="litter-items">
                    {sortedLitters.map((litter) => (
                        <Litter 
                            key={litter.id} 
                            litter={litter} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                        />
                    ))}
                </div>
            ) : (
                <div className="no-litters-message">
                    No litters to show. Follow users or create your own litter to see updates here.
                </div>
            )}
        </div>
    );
};

export default LitterList;
