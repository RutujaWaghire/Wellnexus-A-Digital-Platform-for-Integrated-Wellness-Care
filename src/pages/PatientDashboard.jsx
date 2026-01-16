import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/patient-bg.jpg";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  /* 🔐 Patient protection */
  if (!user || user.role !== "PATIENT") {
    navigate("/", { replace: true });
    return null;
  }

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Soft wellness overlay */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 p-6 flex items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome to Your Wellness Space 🌿
            </h1>
            <p className="text-gray-600 mt-1">
              {user.email}
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Profile Settings
              </h2>
              <p className="text-gray-500 mb-4">
                Update your personal details and preferences.
              </p>

              <button
                onClick={() => navigate("/edit-profile")}
                className="w-full py-2 rounded-xl bg-emerald-600 text-white font-medium hover:opacity-90 transition"
              >
                Edit Profile
              </button>
            </motion.div>

            {/* Account Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-md border p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Account Actions
              </h2>
              <p className="text-gray-500 mb-4">
                Securely manage your session.
              </p>

              <button
                onClick={logout}
                className="w-full py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
