import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PractitionerDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = localStorage.getItem("token");

    // 🔐 Auth check
    if (!token || !user || user.role !== "PRACTITIONER") {
      setRedirecting(true);
      localStorage.clear();
      navigate("/", { replace: true });
      return;
    }

    // 1️⃣ Fetch practitioner profile
    fetch("http://localhost:8080/api/practitioners/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Session expired");
        }
        return res.json();
      })
      .then((profileData) => {
        setProfile(profileData);

        // 2️⃣ Fetch practitioner sessions
        return fetch(
          "http://localhost:8080/api/sessions/practitioner",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      })
      .then((res) => res.json())
      .then((sessionsData) => {
        console.log("Practitioner sessions:", sessionsData);
        setSessions(sessionsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setRedirecting(true);
        localStorage.clear();
        navigate("/", { replace: true });
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
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">
        Practitioner Dashboard{" "}
        {profile.verified && <span className="text-green-600">✔</span>}
      </h1>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-2">
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
          <p className="text-green-600 font-semibold">✔ Verified</p>
        ) : (
          <p className="text-yellow-600">⏳ Verification Pending</p>
        )}
      </div>

      {/* Sessions Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          My Booked Sessions
        </h2>

        {sessions.length === 0 ? (
          <p className="text-gray-500">
            No sessions booked yet.
          </p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Start</th>
                <th className="p-2 border">End</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Notes</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} className="text-center">
                  <td className="p-2 border">{s.slotStart}</td>
                  <td className="p-2 border">{s.slotEnd}</td>
                  <td className="p-2 border">{s.status}</td>
                  <td className="p-2 border">{s.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
