import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './components/profile/Profile.js';
import HomePage from './pages/HomePage.js';
import LitterBoard from './pages/LitterBoard.js';
import SideBar from './pages/SideBar';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { LittersProvider } from './context/LittersContext.js';
import FollowersPage from './pages/FollowersPage.js';
import LitterMates from './pages/LitterMates.js';
import ProtectedRoute from './context/ProtectedRoute.js';
import { WebSocketProvider } from './context/WebsocketContext.js';
import './App.css';

function App() {
  const { user, loading } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        {!loading && user && <SideBar user={user} />}
        <div className={`main-content ${user ? 'with-sidebar' : ''}`}>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/litterboard" /> : <HomePage />}
            />
            <Route
              path="/profile/:profileId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/litterboard"
              element={
                <ProtectedRoute>
                  <LitterBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:profileId/followers"
              element={
                <ProtectedRoute>
                  <FollowersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/littermates"
              element={
                <ProtectedRoute>
                  <LitterMates />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <LittersProvider>
          <App />
        </LittersProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
}
