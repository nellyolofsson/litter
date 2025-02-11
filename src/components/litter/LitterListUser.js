import React, { useContext } from 'react';
import Litter from './Litter';
import './LitterList.css';
import { LittersContext } from '../../context/LittersContext';

const LitterListUser = ({ profileId }) => {
    const { litters } = useContext(LittersContext) || { litters: [] }; // Default to an empty array

    // Ensure litters is an array before proceeding
    const litterArray = Array.isArray(litters) ? litters : [];

    // Filter only the litters that have an owner and match profileId
    const userLitters = litterArray.filter(
        (litter) => litter.owner && litter.owner.id === profileId
    );

    return (
        <div className="litter-list">
            {userLitters.length > 0 ? (
                <div className="litter-items">
                    {userLitters.map((litter) => (
                        <Litter key={litter.id} litter={litter} />
                    ))}
                </div>
            ) : (
                <div className="no-litters-message">
                    This user has no litters to show.
                </div>
            )}
        </div>
    );
};

export default LitterListUser;
