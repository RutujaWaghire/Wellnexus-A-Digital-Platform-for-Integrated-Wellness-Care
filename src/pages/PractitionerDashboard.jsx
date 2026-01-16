import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import wellnessBg from "../assets/wellness-bg.jpeg";

export default function PractitionerDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const [availabilityDate, setAvailabilityDate] = useState("");
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  /* 🔐 Route protection + Profile fetch */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = localStorage.getItem("token");

    if (!token || !user || user.role !== "PRACTITIONER") {
      setRedirecting(true);
      localStorage.clear();
      navigate("/", { replace: true });
      return;
    }

    fetch("http://localhost:8080/api/practitioners/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.ok ? res.json() : Promise.reject("Failed to load profile"))
      .then(data => setProfile(data))
      .catch(() => alert("Unable to load practitioner profile"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const addAvailability = async () => {
    if (!availabilityDate || !availabilityTime) {
      alert("Please select date and time");
      return;
    }

    try {
      setAvailabilityLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8080/api/practitioners/availability",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            date: availabilityDate,
            time: availabilityTime,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to add availability");

      alert("Availability added successfully");
      setAvailabilityDate("");
      setAvailabilityTime("");
    } catch (err) {
      alert(err.message);
    } finally {
      setAvailabilityLoading(false);
    }
  };

  if (redirecting || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          {redirecting ? "Redirecting..." : "Loading dashboard..."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${wellnessBg})` }}
    >
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-white/25 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-[#2f3e3a]">
              Welcome, {profile.user?.name}
            </h1>
            <p className="text-[#6b7c77]">{profile.specialization}</p>

            <div className="mt-4">
              {profile.verified ? (
                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  ✔ Verified Practitioner
                </span>
              ) : (
                <span className="px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                  ⏳ Verification Pending
                </span>
              )}
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-[#6b8f7a] text-white px-5 py-2 rounded-lg hover:bg-[#5f7f6b]"
          >
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            "Upcoming Sessions",
            "Total Sessions",
            "Average Rating",
            "Availability Slots",
          ].map(title => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.04 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <p className="text-sm text-[#6b7c77]">{title}</p>
              <p className="text-3xl font-semibold text-[#2f3e3a] mt-3">—</p>
            </motion.div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AVAILABILITY */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-medium mb-4 text-[#2f3e3a]">
              Manage Availability
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="date"
                value={availabilityDate}
                onChange={e => setAvailabilityDate(e.target.value)}
                className="border rounded-md px-3 py-2"
              />

              <input
                type="time"
                value={availabilityTime}
                onChange={e => setAvailabilityTime(e.target.value)}
                className="border rounded-md px-3 py-2"
              />

              <button
                onClick={addAvailability}
                disabled={availabilityLoading}
                className="bg-[#6b8f7a] text-white py-2 rounded-md hover:bg-[#5f7f6b]"
              >
                {availabilityLoading ? "Adding..." : "Add Availability"}
              </button>
            </div>
          </div>

          {/* COMMUNITY Q&A */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-medium text-[#2f3e3a] mb-4">
              Community Q&A
            </h2>

            <textarea
              rows={4}
              className="w-full border rounded-md px-4 py-3"
              placeholder="Write your answer here..."
            />

            <div className="flex justify-end mt-4">
              <button className="bg-[#6b8f7a] text-white px-6 py-2 rounded-md">
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
