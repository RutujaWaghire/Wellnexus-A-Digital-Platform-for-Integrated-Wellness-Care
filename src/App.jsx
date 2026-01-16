import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import EditProfile from "./pages/EditProfile"; // ✅ ADD THIS
import AdminDashboard from "./pages/AdminDashboard"; // ✅ ADD THIS
import Practitioners from "./pages/Practitioners"; // ✅ ADD THIS
import CreateSession from "./pages/CreateSession";
import SessionSuccess from "./pages/SessionSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ✅ NEW */}
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/practitioners" element={<Practitioners />} />

      <Route path="/create-session" element={<CreateSession />} />
      <Route path="/session-success" element={<SessionSuccess />} />

      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
    </Routes>
  );
}

export default App;
