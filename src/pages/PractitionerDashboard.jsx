import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PractitionerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Route protection
  useEffect(() => {
    if (!user || user.role !== "PRACTITIONER") {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  // ✅ Fetch ONLY logged-in practitioner profile
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/practitioners/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load profile");
        }
        return res.json();
      })
      .then((data) => {
        console.log("My practitioner profile:", data);
        setProfile(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to load practitioner profile");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">
        Practitioner Dashboard{" "}
        {profile.verified && <span className="text-green-600">✔</span>}
      </h1>

      <p>
        <strong>Name:</strong> {profile.user.name}
      </p>

      <p>
        <strong>Email:</strong> {profile.user.email}
      </p>

      <p>
        <strong>Specialization:</strong> {profile.specialization}
      </p>

      {profile.verified ? (
        <p className="text-green-600 font-semibold">
          You are Verified ✔
        </p>
      ) : (
        <p className="text-yellow-600">
          Verification Pending ⏳
        </p>
      )}

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
