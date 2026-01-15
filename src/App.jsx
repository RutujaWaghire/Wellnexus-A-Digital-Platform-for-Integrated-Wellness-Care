// import { Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PatientDashboard from "./pages/PatientDashboard";
// import PractitionerDashboard from "./pages/PractitionerDashboard";
// import EditProfile from "./pages/EditProfile"; // ✅ ADD THIS
// import AdminDashboard from "./pages/AdminDashboard"; // ✅ ADD THIS
// import Practitioners from "./pages/Practitioners"; // ✅ ADD THIS

// import AuthHero from "./components/AuthHero";
// function App() {
//   return (
//      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      
//       {/* LEFT: HERO */}
//       <AuthHero />

//       {/* RIGHT: PLACEHOLDER */}
//       <div className="flex items-center justify-center bg-white">
//         <div className="w-96 h-96 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
//          <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/register" element={<Register />} />
// </Routes>
//         </div>
//       </div>

//     </div>
    
    
//       {/* ✅ NEW */}
//        <Routes>
//       <Route path="/edit-profile" element={<EditProfile />} />
//       <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       <Route path="/practitioners" element={<Practitioners />} />

//       <Route path="/patient-dashboard" element={<PatientDashboard />} />
//       <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import EditProfile from "./pages/EditProfile";
import Practitioners from "./pages/Practitioners";

import AuthHero from "./components/AuthHero";
// const DEV_PRACTITIONER_DASHBOARD_ONLY = import.meta.env.VITE_PRACTITIONER_DASHBOARD_ONLY === 'true';
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      {/* LEFT */}
      <AuthHero />

      {/* RIGHT */}
      <div className="flex items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route
        path="/"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />

      {/* APP ROUTES */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/practitioners" element={<Practitioners />} />
    </Routes>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PatientDashboard from "./pages/PatientDashboard";
// import PractitionerDashboard from "./pages/PractitionerDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import EditProfile from "./pages/EditProfile";
// import Practitioners from "./pages/Practitioners";

// import AuthHero from "./components/AuthHero";

// // ✅ DEV FLAG (correct name)
// const DEV_PRACTITIONER_DASHBOARD_ONLY =
//   import.meta.env.VITE_PRACTITIONER_DASHBOARD_ONLY === "true";

// function AuthLayout({ children }) {
//   return (
//     <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
//       {/* LEFT */}
//       <AuthHero />

//       {/* RIGHT */}
//       <div className="flex items-center justify-center bg-white">
//         {children}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Routes>
//       {DEV_PRACTITIONER_DASHBOARD_ONLY ? (
//         // 🔴 TEMP: Practitioner dashboard UI development ONLY
//         <Route path="*" element={<PractitionerDashboard />} />
//       ) : (
//         <>
//           {/* AUTH ROUTES */}
//           <Route
//             path="/"
//             element={
//               <AuthLayout>
//                 <Login />
//               </AuthLayout>
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <AuthLayout>
//                 <Register />
//               </AuthLayout>
//             }
//           />

//           {/* APP ROUTES */}
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/patient-dashboard" element={<PatientDashboard />} />
//           <Route
//             path="/practitioner-dashboard"
//             element={<PractitionerDashboard />}
//           />
//           <Route path="/edit-profile" element={<EditProfile />} />
//           <Route path="/practitioners" element={<Practitioners />} />
//         </>
//       )}
//     </Routes>
//   );
// }

// export default App;