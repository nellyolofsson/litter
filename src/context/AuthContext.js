// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // För att lagra användardata
  const [loading, setLoading] = useState(true); // För att hålla reda på om vi väntar på autentisering

  const authenticateUser = async () => {
    try {
      const response = await fetch('https://cscloud8-229.lnu.se/api/v1/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const res = await response.json();
        setUser(res.user);
        setToken(res.jwttoken) // Sätt användaren om inloggning lyckas
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user authentication status once on mount
  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, loading, setUser, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
