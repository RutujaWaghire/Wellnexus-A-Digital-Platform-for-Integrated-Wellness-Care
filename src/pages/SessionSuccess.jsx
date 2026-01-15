import { useLocation, useNavigate } from "react-router-dom";

export default function SessionSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const session = state?.session;

  if (!session) {
    // If no session data, go back to patient dashboard
    navigate("/patient-dashboard", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Session Booked</h1>
      <div className="bg-white p-6 rounded shadow w-96">
        <p><strong>ID:</strong> {session.id}</p>
        <p><strong>Practitioner:</strong> {session.practitionerName || session.practitioner}</p>
        <p><strong>Specialization:</strong> {session.specialization}</p>
        <p><strong>Start:</strong> {session.slotStart}</p>
        <p><strong>End:</strong> {session.slotEnd}</p>
        <p><strong>Status:</strong> {session.status}</p>
        <p><strong>Notes:</strong> {session.notes}</p>
      </div>

      <button
        onClick={() => navigate('/patient-dashboard')}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
}
