import React, { useState } from "react";
import "./style/settingsButton.css";

function SettingButton() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="level-card">
      <button
        className="settings-button"
        onClick={() => setIsSettingsOpen(true)}
      >
        Settings
      </button>

      {isSettingsOpen && (
        <div className="settings-modal">
          <div
            className="settings-modal-background"
            onClick={() => setIsSettingsOpen(false)}
          />

          <div className="settings-modal-content">
            <button onClick={handleFirstButton}>First Button</button>
            <button onClick={handleSecondButton}>Second Button</button>
            <button onClick={handleThirdButton}>Third Button</button>
          </div>
        </div>
      )}

      {/* Other content... */}
    </div>
  );
}

function handleFirstButton() {
  // Implement the functionality for the first button here
}

function handleSecondButton() {
  // Implement the functionality for the second button here
}

function handleThirdButton() {
  // Implement the functionality for the third button here
}
