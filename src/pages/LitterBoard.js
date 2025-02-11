import React, { useState, useEffect, useContext } from 'react';
import LitterList from '../components/litter/LitterList';
import LitterCreateModal from '../components/litter/LitterCreateModal';
import './LitterBoard.css';
import { AuthContext } from '../context/AuthContext';

const LitterBoard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const { user, token } = useContext(AuthContext);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="litter-board">
      <header className="litter-board-header">
        <h1 className="litter-board-title">Litter Box</h1>
        <button className="create-litter-button" onClick={openCreateModal}>
          {isSmallScreen ? '💬' : '💬 Write a Litter'}
        </button>
      </header>

      <LitterList />
      {isCreateModalOpen && (
        <LitterCreateModal
          onClose={closeCreateModal}
          user={user}
        />
      )}
    </div>
  );
};

export default LitterBoard;
