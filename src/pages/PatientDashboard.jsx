
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || user.role !== "PATIENT") {
    navigate("/", { replace: true });
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Patient Dashboard</h1>
      <p>{user.email}</p>

      {/* 🔹 Instagram-like Edit Profile */}
      <button
        onClick={() => navigate("/edit-profile")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Edit Profile
      </button>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
