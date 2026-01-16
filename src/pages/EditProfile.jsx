import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EditProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* 🔐 Load profile from backend */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!token || !user) {
      navigate("/", { replace: true });
      return;
    }

    fetch("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setName(data.name || "");
        setBio(data.bio || "");
      })
      .catch(() => alert("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [navigate]);

  /* 💾 Save profile */
  const saveProfile = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, bio }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Profile updated successfully");
      navigate(-1); // 🔙 back to dashboard
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-[#2f3e3a]">
            Edit Profile
          </h2>
          <p className="text-sm text-[#6b7c77] mt-1">
            Update your personal wellness information
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2f3e3a] mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6b8f7a]"
            placeholder="Your name"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#2f3e3a] mb-1">
            Bio
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6b8f7a]"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border rounded-lg py-2 text-[#6b7c77] hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={saveProfile}
            disabled={saving}
            className="flex-1 bg-[#6b8f7a] text-white rounded-lg py-2 hover:bg-[#5f7f6b] transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
