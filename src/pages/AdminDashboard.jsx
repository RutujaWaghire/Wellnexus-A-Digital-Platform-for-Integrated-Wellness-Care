import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgImage from "../assets/admin-bg.jpg";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [practitioners, setPractitioners] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  /* 🔐 Admin protection */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  /* 📊 Fetch analytics */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/admin/analytics", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setAnalytics)
      .catch(() => console.warn("Analytics unavailable"));
  }, []);

  /* 📥 Fetch practitioners */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    fetch("http://localhost:8080/api/admin/practitioners", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPractitioners)
      .catch(() => alert("Error loading practitioners"))
      .finally(() => setLoading(false));
  }, [navigate]);

  /* ✅ Verify practitioner */
  const verifyPractitioner = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:8080/api/admin/practitioners/${id}/verify`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ verified: true }),
      }
    );

    setPractitioners((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verified: true } : p
      )
    );
  };

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Platform analytics & practitioner management
              </p>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          {/* Analytics */}
          {analytics && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {[
                ["Users", analytics.totalUsers],
                ["Recommendations", analytics.totalRecommendations],
                ["Orders", analytics.totalOrders],
                ["Bookings", analytics.totalBookings],
              ].map(([label, value], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow p-4 text-center"
                >
                  <p className="text-gray-500 text-sm">{label}</p>
                  <p className="text-2xl font-bold text-gray-800">{value}</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Practitioner Cards */}
          {loading ? (
            <p className="text-gray-600">Loading practitioners...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practitioners.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <h2 className="font-semibold text-lg text-gray-800">
                    {p.user.name}
                  </h2>
                  <p className="text-sm text-gray-500">{p.user.email}</p>
                  <p className="mt-2">
                    <span className="font-medium">Specialization:</span>{" "}
                    {p.specialization}
                  </p>

                  <p className="mt-2">
                    Status:{" "}
                    <span
                      className={
                        p.verified
                          ? "text-green-600 font-medium"
                          : "text-orange-500 font-medium"
                      }
                    >
                      {p.verified ? "Verified" : "Pending"}
                    </span>
                  </p>

                  {!p.verified && (
                    <button
                      onClick={() => verifyPractitioner(p.id)}
                      className="mt-4 w-full py-2 rounded-xl bg-emerald-600 text-white hover:opacity-90"
                    >
                      Verify Practitioner
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
