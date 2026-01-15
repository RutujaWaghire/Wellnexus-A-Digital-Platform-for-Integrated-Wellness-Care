// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PractitionerDashboard() {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [redirecting, setRedirecting] = useState(false);

//   // 🔐 Route protection & Fetch profile
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     const token = localStorage.getItem("token");

//     // Check authentication
//     if (!token || !user || user.role !== "PRACTITIONER") {
//       setRedirecting(true);
//       localStorage.clear();
//       navigate("/", { replace: true });
//       return;
//     }

//     // Fetch practitioner profile
//     fetch("http://localhost:8080/api/practitioners/me", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(async (res) => {
//         // Handle JWT expiration
//         if (res.status === 401) {
//           setRedirecting(true);
//           localStorage.clear();
//           setTimeout(() => {
//             navigate("/", { replace: true });
//           }, 100);
//           return null;
//         }

//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(text || "Failed to load profile");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data) {
//           setProfile(data);
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.error("Error loading profile:", err);
//         setLoading(false);
//         alert("Unable to load practitioner profile: " + err.message);
//       });
//   }, [navigate]);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/", { replace: true });
//   };

//   if (redirecting) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg">Redirecting to login...</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p className="text-xl">Profile not found</p>
//         <button
//           onClick={logout}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//         >
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
//       <h1 className="text-2xl font-bold">
//         Practitioner Dashboard{" "}
//         {profile.verified && <span className="text-green-600">✔</span>}
//       </h1>

//       <div className="bg-white shadow-md rounded-lg p-6 space-y-3">
//         <p>
//           <strong>Name:</strong> {profile.user.name}
//         </p>

//         <p>
//           <strong>Email:</strong> {profile.user.email}
//         </p>

//         <p>
//           <strong>Specialization:</strong> {profile.specialization}
//         </p>

//         {profile.verified ? (
//           <p className="text-green-600 font-semibold">
//             ✔ You are Verified
//           </p>
//         ) : (
//           <p className="text-yellow-600">
//             ⏳ Verification Pending
//           </p>
//         )}
//       </div>

//       <button
//         onClick={logout}
//         className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition mt-4"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PractitionerDashboard() {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [redirecting, setRedirecting] = useState(false);

//   // 🔐 BACKEND INTEGRATION (UNCHANGED)
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     const token = localStorage.getItem("token");

//     if (!token || !user || user.role !== "PRACTITIONER") {
//       setRedirecting(true);
//       localStorage.clear();
//       navigate("/", { replace: true });
//       return;
//     }

//     fetch("http://localhost:8080/api/practitioners/me", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(async (res) => {
//         if (res.status === 401) {
//           setRedirecting(true);
//           localStorage.clear();
//           navigate("/", { replace: true });
//           return null;
//         }

//         if (!res.ok) {
//           const text = await res.text();
//           throw new Error(text || "Failed to load profile");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         if (data) setProfile(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [navigate]);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/", { replace: true });
//   };

//   // 🔄 STATES
//   if (redirecting) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f4f9f8]">
//         <p className="text-lg text-gray-600">Redirecting to login…</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f4f9f8]">
//         <p className="text-lg text-gray-600">Loading dashboard…</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f4f9f8]">
//         <p className="text-lg text-gray-600">Unable to load profile</p>
//       </div>
//     );
//   }

//   // 🌿 WELLNESS DASHBOARD UI
//   return (
//     <div className="min-h-screen bg-[#f4f9f8] p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Welcome, {profile.user?.name}
//           </h1>
//           <p className="text-gray-500">
//             {profile.specialization}
//           </p>
//         </div>

//         <button
//           onClick={logout}
//           className="px-4 py-2 rounded-md bg-[#0f766e] text-white hover:bg-[#115e59] transition"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Verification Status */}
//       <div className="mb-8">
//         {profile.verified ? (
//           <span className="inline-flex items-center px-4 py-1 rounded-full text-sm bg-green-100 text-green-700">
//             ✔ Verified Practitioner
//           </span>
//         ) : (
//           <span className="inline-flex items-center px-4 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
//             ⏳ Verification Pending
//           </span>
//         )}
//       </div>

//       {/* Dashboard Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {/* Upcoming Sessions */}
//         <section className="bg-white rounded-xl shadow-sm p-5">
//           <h2 className="text-lg font-medium text-gray-700 mb-3">
//             Upcoming Sessions
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Your scheduled sessions will appear here.
//           </p>
//         </section>

//         {/* Manage Availability */}
//         <section className="bg-white rounded-xl shadow-sm p-5">
//           <h2 className="text-lg font-medium text-gray-700 mb-3">
//             Manage Availability
//           </h2>

//           <div className="flex flex-col gap-3">
//             <input
//               type="date"
//               className="border rounded-md p-2 text-gray-600"
//             />
//             <input
//               type="time"
//               className="border rounded-md p-2 text-gray-600"
//             />
//             <button
//               className="mt-2 bg-[#0f766e] text-white py-2 rounded-md hover:bg-[#115e59] transition"
//             >
//               Add Availability
//             </button>
//           </div>
//         </section>

//         {/* Q&A Community */}
//         <section className="bg-white rounded-xl shadow-sm p-5 md:col-span-2 xl:col-span-3">
//           <h2 className="text-lg font-medium text-gray-700 mb-3">
//             Community Q&A
//           </h2>

//           <p className="text-gray-500 text-sm mb-3">
//             Questions from the community will appear here for you to answer.
//           </p>

//           <textarea
//             placeholder="Write your answer here…"
//             className="w-full border rounded-md p-3 text-gray-600"
//             rows={4}
//           />

//           <button
//             className="mt-3 bg-[#0f766e] text-white px-4 py-2 rounded-md hover:bg-[#115e59] transition"
//           >
//             Submit Answer
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import wellnessBg from "../assets/wellness-bg.jpeg";
export default function PractitionerDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const [availabilityDate, setAvailabilityDate] = useState("");
const [availabilityTime, setAvailabilityTime] = useState("");
const [availabilityLoading, setAvailabilityLoading] = useState(false);
  
  // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // 🔐 Route protection & Fetch profile
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const token = localStorage.getItem("token");

    // Check authentication
    if (!token || !user || user.role !== "PRACTITIONER") {
      setRedirecting(true);
      localStorage.clear();
      navigate("/", { replace: true });
      return;
    }

    // Fetch practitioner profile
    fetch("http://localhost:8080/api/practitioners/me", {
      // method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        // Handle JWT expiration
        if (res.status === 401) {
          setRedirecting(true);
          localStorage.clear();
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 100);
          return null;
        }

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to load profile");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setProfile(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        setLoading(false);
        alert("Unable to load practitioner profile: " + err.message);
      });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  if (redirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Redirecting to login...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl">Profile not found</p>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    );
  }

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

    if (!res.ok) {
      throw new Error("Failed to add availability");
    }

    alert("Availability added successfully");
    setAvailabilityDate("");
    setAvailabilityTime("");
  } catch (err) {
    alert(err.message);
  } finally {
    setAvailabilityLoading(false);
  }
};

  return (
  <div
    className="min-h-screen bg-cover bg-center bg-no-repeat relative"
    style={{
      backgroundImage: `url(${wellnessBg})`,
    }}
  >
    {/* Soft wellness overlay */}
    <div className="absolute inset-0 bg-white/15 backdrop-blur-[1px]"></div>

    {/* Dashboard content */}
    <div className="relative z-10 px-6 py-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-semibold text-[#2f3e3a]">
            Welcome, {profile.user?.name}
          </h1>
          <p className="text-[#6b7c77] mt-1">
            {profile.specialization}
          </p>

          <div className="mt-4">
            {profile.verified ? (
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                ✔ Verified Practitioner
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                ⏳ Verification Pending
              </span>
            )}
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-[#6b8f7a] text-white px-5 py-2 rounded-md hover:bg-[#5f7f6b] transition"
        >
          Logout
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          "Upcoming Sessions",
          "Total Sessions",
          "Pending Answers",
          "Availability Slots",
        ].map((title) => (
          <div
            key={title}
            className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6"
          >
            <p className="text-[#6b7c77] text-sm">{title}</p>
            <p className="text-3xl font-semibold text-[#2f3e3a] mt-3">
              {/* Backend value */}
            </p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* UPCOMING SESSIONS */}
        <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6">
          <h2 className="text-lg font-medium text-[#2f3e3a] mb-4">
            Upcoming Sessions
          </h2>

          <p className="text-[#6b7c77] text-sm">
            Sessions scheduled for you will appear here.
          </p>
        </div>

        {/* MANAGE AVAILABILITY */}
        <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6">
          <h2 className="text-lg font-medium text-[#2f3e3a] mb-4">
            Manage Availability
          </h2>

          <div className="flex flex-col gap-4">
            {/* <input
              type="date"
              className="border border-gray-200 rounded-md px-3 py-2 text-[#2f3e3a] focus:outline-none focus:ring-2 focus:ring-[#6b8f7a]"
            />

            <input
              type="time"
              className="border border-gray-200 rounded-md px-3 py-2 text-[#2f3e3a] focus:outline-none focus:ring-2 focus:ring-[#6b8f7a]"
            /> */}
            <input
  type="date"
  value={availabilityDate}
  onChange={(e) => setAvailabilityDate(e.target.value)}
  className="border border-gray-200 rounded-md px-3 py-2"
/>

<input
  type="time"
  value={availabilityTime}
  onChange={(e) => setAvailabilityTime(e.target.value)}
  className="border border-gray-200 rounded-md px-3 py-2"
/>

           <button
  onClick={addAvailability}
  disabled={availabilityLoading}
  className="mt-2 bg-[#6b8f7a] text-white py-2 rounded-md hover:bg-[#5f7f6b] transition disabled:opacity-50"
>
  {availabilityLoading ? "Adding..." : "Add Availability"}
</button>

            <p className="text-[#9aa8a3] text-sm text-center">
              No availability slots added yet
            </p>
          </div>
        </div>
      </div>

      {/* COMMUNITY Q&A */}
      <div className="bg-white rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.12)] p-6 mt-12">
        <h2 className="text-lg font-medium text-[#2f3e3a] mb-4">
          Community Q&A
        </h2>

        <p className="text-[#6b7c77] text-sm mb-4">
          Questions from the community will appear here for you to answer.
        </p>

        <textarea
          rows={4}
          className="w-full border border-gray-200 rounded-md px-4 py-3 text-[#2f3e3a] focus:outline-none focus:ring-2 focus:ring-[#6b8f7a]"
          placeholder="Write your answer here..."
        />

        <div className="flex justify-end mt-4">
          <button
            className="bg-[#6b8f7a] text-white px-6 py-2 rounded-md hover:bg-[#5f7f6b] transition"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export default function PractitionerDashboard() {
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [status, setStatus] = useState("loading"); // loading | error | ready
//   console.log("PractitionerDashboard loaded");
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       localStorage.clear();
//       navigate("/", { replace: true });
//       return;
//     }

//     fetch(`${API_BASE_URL}/api/practitioners/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then(async (res) => {
//         if (res.status === 401) {
//           localStorage.clear();
//           navigate("/", { replace: true });
//           return null;
//         }

//         if (!res.ok) {
//           throw new Error("Failed to fetch practitioner profile");
//         }

//         return res.json();
//       })
//       .then((data) => {
//         if (!data) return;
//         setProfile(data);
//         setStatus("ready");
//       })
//       .catch((err) => {
//         console.error(err);
//         setStatus("error");
//       });
//   }, [navigate]);

//   const logout = () => {
//     localStorage.clear();
//     navigate("/", { replace: true });
//   };

//   if (status === "loading") {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg">Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (status === "error" || !profile) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p className="text-red-600 text-lg">
//           Unable to load practitioner profile
//         </p>
//         <button
//           onClick={logout}
//           className="bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         Practitioner Dashboard{" "}
//         {profile.verified && <span className="text-green-600">✔</span>}
//       </h1>

//       <div className="bg-white shadow rounded-lg p-6 w-full max-w-md space-y-3">
//         <p>
//           <strong>Name:</strong> {profile.user?.name || "—"}
//         </p>
//         <p>
//           <strong>Email:</strong> {profile.user?.email || "—"}
//         </p>
//         <p>
//           <strong>Specialization:</strong> {profile.specialization || "—"}
//         </p>

//         {profile.verified ? (
//           <p className="text-green-600 font-semibold">Verified Practitioner</p>
//         ) : (
//           <p className="text-yellow-600">Verification Pending</p>
//         )}
//       </div>

//       <button
//         onClick={logout}
//         className="bg-red-600 text-white px-6 py-2 rounded mt-6"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }