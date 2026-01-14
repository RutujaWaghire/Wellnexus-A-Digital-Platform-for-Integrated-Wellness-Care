import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PractitionerDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  // 🔐 Route protection & Fetch profile
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = localStorage.getItem("token");

    // Check authentication
    if (!token || !user || user.role !== "PRACTITIONER") {
      setRedirecting(true);
      localStorage.clear();
      navigate("/", { replace: true });
      return;
    }

    // Fetch practitioner profile
    fetch("http://localhost:8080/api/practitioners/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        // Handle JWT expiration
        if (res.status === 401) {
          setRedirecting(true);
          localStorage.clear();
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 100);
          return null;
        }

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load profile");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        setLoading(false);
        alert("Unable to load practitioner profile: " + err.message);
      });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Redirecting to login...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Profile not found</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">
        Practitioner Dashboard{" "}
        {profile.verified && <span className="text-green-600">✔</span>}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
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
            ✔ You are Verified
          </p>
        ) : (
          <p className="text-yellow-600">
            ⏳ Verification Pending
          </p>
        )}
      </div>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition mt-4"
      >
        Logout
      </button>
    </div>
  );
}
