import React from "react";
import "./LogoutButton.css";

function LogoutButton() {
  const handleLogout  = () => {
    window.location.href = "https://cscloud8-229.lnu.se/api/v1/auth/logout";
  };

  return (
    <div >
    <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutButton;