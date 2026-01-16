import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function SessionSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const session = state?.session;

  if (!session) {
    navigate("/patient-dashboard", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4f2] via-[#f7faf9] to-[#ffffff] px-4">
      <div
        className="
          w-full max-w-xl
          bg-white
          rounded-2xl
          px-8 py-10
          shadow-[0_15px_45px_rgba(0,0,0,0.08)]
        "
      >
        {/* ICON + HEADER */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="mb-4">
            <CheckCircle className="h-14 w-14 text-[#2f5f59]" />
          </div>

          <h1 className="text-3xl font-bold text-[#1f3f3a]">
            Session Booked Successfully
          </h1>

          <p className="mt-2 text-sm text-[#6f8f89]">
            Your wellness journey continues ✨
          </p>
        </div>

        {/* SESSION DETAILS */}
        <div className="space-y-4 text-sm text-[#2f3e3a]">
          <div className="flex justify-between">
            <span className="text-[#6f8f89]">Session ID</span>
            <span className="font-medium">{session.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#6f8f89]">Practitioner</span>
            <span className="font-medium">
              {session.practitionerName || session.practitioner}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#6f8f89]">Specialization</span>
            <span className="font-medium">{session.specialization}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#6f8f89]">Start Time</span>
            <span className="font-medium">
              {new Date(session.slotStart).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#6f8f89]">End Time</span>
            <span className="font-medium">
              {new Date(session.slotEnd).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#6f8f89]">Status</span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
              {session.status}
            </span>
          </div>

          {session.notes && (
            <div className="pt-4 border-t border-[#e3ece8]">
              <p className="text-[#6f8f89] mb-1">Notes</p>
              <p className="text-[#2f3e3a]">
                {session.notes}
              </p>
            </div>
          )}
        </div>

        {/* ACTION */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/patient-dashboard")}
            className="
              w-full py-3 rounded-xl
              bg-[#2f5f59] text-white font-semibold
              hover:bg-[#274f4a]
              transition
            "
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
