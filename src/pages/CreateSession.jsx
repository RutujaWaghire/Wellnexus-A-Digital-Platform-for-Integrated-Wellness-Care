import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSession() {
  const navigate = useNavigate();
  const [practitioners, setPractitioners] = useState([]);
  const [practitionerId, setPractitionerId] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/practitioners", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setPractitioners)
      .catch((err) =>
        console.error("Failed to load practitioners", err)
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in");
      navigate("/", { replace: true });
      return;
    }

    const payload = {
      practitionerId: Number(practitionerId),
      slotStart,
      slotEnd: slotEnd || null,
      notes,
    };

    try {
      const res = await fetch("http://localhost:8080/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Booking failed");

      const data = await res.json();
      navigate("/session-success", { state: { session: data } });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Book Therapy Session
        </h2>

        {/* Practitioner */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Practitioner
          </label>
          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={practitionerId}
            onChange={(e) => setPractitionerId(e.target.value)}
            required
          >
            <option value="">Select practitioner</option>
            {practitioners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={slotStart}
              onChange={(e) => setSlotStart(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date & Time (Optional)
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={slotEnd}
              onChange={(e) => setSlotEnd(e.target.value)}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes / Problem Description
          </label>
          <textarea
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
            rows="3"
            placeholder="Describe your issue briefly..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Book Session
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
