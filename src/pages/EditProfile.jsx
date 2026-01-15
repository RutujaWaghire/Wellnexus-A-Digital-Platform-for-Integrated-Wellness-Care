import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const navigate = useNavigate();
  const storedProfile = JSON.parse(localStorage.getItem("profile")) || {};

  const [name, setName] = useState(storedProfile.name || "");
  const [bio, setBio] = useState(storedProfile.bio || "");

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify({ name, bio }));
    alert("Profile updated");
    navigate(-1); // 🔙 back to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 w-96 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          className="w-full mb-3 p-2 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          onClick={saveProfile}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
