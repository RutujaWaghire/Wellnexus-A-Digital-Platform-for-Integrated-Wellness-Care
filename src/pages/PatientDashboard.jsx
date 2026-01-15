import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alertedSessions, setAlertedSessions] = useState([]);

  if (!user || user.role !== "PATIENT") {
    navigate("/", { replace: true });
    return null;
  }

  // 🔹 Load sessions
  useEffect(() => {
    fetch("http://localhost:8080/api/sessions/my", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSessions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  // 🔔 AUTO REMINDER (5 & 10 min before)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      sessions.forEach((s) => {
        if (s.status !== "BOOKED") return;

        const startTime = new Date(s.slotStart).getTime();
        const diffMinutes = Math.floor((startTime - now) / 60000);

        if (alertedSessions.includes(s.id)) return;

        if (diffMinutes === 10 || diffMinutes === 5) {
          alert(
            `⏰ Reminder: Your session with ${s.practitionerName} starts in ${diffMinutes} minutes`
          );
          setAlertedSessions((prev) => [...prev, s.id]);
        }
      });
    }, 30000); // check every 30 sec

    return () => clearInterval(interval);
  }, [sessions, alertedSessions]);

  const cancelSession = async (id) => {
    if (!window.confirm("Cancel this session?")) return;

    await fetch(`http://localhost:8080/api/sessions/${id}/cancel`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    window.location.reload();
  };

  const rescheduleSession = async (id) => {
    const newStart = prompt(
      "Enter new start datetime (YYYY-MM-DDTHH:mm)"
    );
    if (!newStart) return;

    await fetch(
      `http://localhost:8080/api/sessions/${id}/reschedule`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newSlotStart: newStart + ":00",
        }),
      }
    );

    alert("Session rescheduled");
    window.location.reload();
  };

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>
      <p>{user.email}</p>

      <div className="flex gap-2 my-4">
        <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        <button onClick={() => navigate("/create-session")}>
          Book Session
        </button>
        <button onClick={logout}>Logout</button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">My Sessions</h2>

      {loading ? (
        <p>Loading sessions...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Practitioner</th>
              <th>Specialization</th>
              <th>Start</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((s) => (
              <tr key={s.id}>
                <td>{s.practitionerName}</td>
                <td>{s.practitionerSpecialization}</td>
                <td>{s.slotStart}</td>
                <td>{s.status}</td>
                <td>
                  <button onClick={() => cancelSession(s.id)}>
                    Cancel
                  </button>{" "}
                  <button onClick={() => rescheduleSession(s.id)}>
                    Reschedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
