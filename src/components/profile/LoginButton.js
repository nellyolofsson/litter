import React from 'react';
import { FaGoogle } from 'react-icons/fa';  // Importera Google-ikonen från react-icons
import './LoginButton.css'; // Importera CSS-filen

const LoginButton = () => {
  const handleLogin = () => {;
    window.location.href = 'https://cscloud8-229.lnu.se/api/v1/auth/google'; // Länk till inloggningssidan
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login with Google</h2>
      <button className="login-button" onClick={handleLogin}>
        <FaGoogle style={{ marginRight: '10px' }} /> {/* Lägg till ikonen */}
        Login with Google
      </button>
    </div>
  );
};

export default LoginButton;
