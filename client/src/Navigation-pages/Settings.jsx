import React, { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("Sajid");

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white border rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-6">Settings</h1>

      {/* Profile Settings */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Profile</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-3">Preferences</h2>
        <div className="flex items-center justify-between p-3 border rounded">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-4 w-4"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Save Changes
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
      </div>
    </div>
  );
}
