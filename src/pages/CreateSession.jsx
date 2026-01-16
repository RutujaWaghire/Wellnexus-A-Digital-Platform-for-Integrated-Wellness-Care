import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateSession() {
  const navigate = useNavigate();

  const [practitioners, setPractitioners] = useState([]);
  const [practitionerId, setPractitionerId] = useState("");
  const [slotStart, setSlotStart] = useState("");
  const [slotEnd, setSlotEnd] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔐 Load practitioners (PATIENT)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8080/api/practitioners", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
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
      setLoading(true);

      const res = await fetch("http://localhost:8080/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Session booking failed");

      const data = await res.json();
      navigate("/session-success", { state: { session: data } });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4f2] via-[#f7faf9] to-[#ffffff] px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-2xl
          bg-white
          rounded-2xl
          px-10 py-10
          shadow-[0_15px_45px_rgba(0,0,0,0.08)]
        "
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1f3f3a]">
            Book a Therapy Session
          </h2>
          <p className="mt-2 text-sm text-[#6f8f89]">
            Choose a practitioner and schedule your wellness session
          </p>
        </div>

        {/* PRACTITIONER */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
            Practitioner
          </label>
          <select
            value={practitionerId}
            onChange={(e) => setPractitionerId(e.target.value)}
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-[#eef4f2] text-[#1f3f3a]
              focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
            "
          >
            <option value="">Select a practitioner</option>
            {practitioners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* DATE & TIME */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={slotStart}
              onChange={(e) => setSlotStart(e.target.value)}
              required
              className="
                w-full px-4 py-3 rounded-xl
                bg-[#eef4f2] text-[#1f3f3a]
                focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
              "
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
              End Date & Time (Optional)
            </label>
            <input
              type="datetime-local"
              value={slotEnd}
              onChange={(e) => setSlotEnd(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl
                bg-[#eef4f2] text-[#1f3f3a]
                focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
              "
            />
          </div>
        </div>

        {/* NOTES */}
        <div className="mb-8">
          <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
            Notes / Health Concern
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Briefly describe your concern..."
            className="
              w-full px-4 py-3 rounded-xl resize-none
              bg-[#eef4f2] text-[#1f3f3a]
              placeholder-[#8fa5a0]
              focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
            "
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="
              flex-1 py-3 rounded-xl
              bg-[#2f5f59] text-white font-semibold
              hover:bg-[#274f4a]
              transition disabled:opacity-50
            "
          >
            {loading ? "Booking..." : "Confirm Session"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex-1 py-3 rounded-xl
              bg-[#e6efec] text-[#1f3f3a] font-semibold
              hover:bg-[#d7e7e2]
              transition
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
