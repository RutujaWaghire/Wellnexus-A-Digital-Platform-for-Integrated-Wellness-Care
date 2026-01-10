// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom"; 

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (user) navigate("/dashboard", { replace: true });
//   }, [navigate]);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (!user) {
//       alert("Invalid email or password");
//       return;
//     }

//     localStorage.setItem("loggedInUser", JSON.stringify(user));

//     if (user.userType === "patient") {
//       navigate("/dashboard", { replace: true });
//     } else {
//       navigate("/dashboard", { replace: true });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-6 w-96 rounded-lg shadow-md"
//       >
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full mb-3 p-2 border rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full mb-4 p-2 border rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Login
//         </button>

//         <p className="text-sm text-center mt-3">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-600">
//             Register
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // const users = JSON.parse(localStorage.getItem("users")) || [];
//     // const user = users.find(u => u.email === email && u.password === password);

//     const res = await fetch("/api/login", { ... });
// const data = await res.json();
// localStorage.setItem("token", data.token);
//     if (!user) {
//       alert("Invalid email or password");
//       return;
//     }

//     localStorage.setItem("loggedInUser", JSON.stringify(user));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input 
//           type="email" 
//           placeholder="Enter your email" 
//           value={email} 
//           onChange={e => setEmail(e.target.value)} 
//           required 
//         />
//         <input 
//           type="password" 
//           placeholder="Enter your password" 
//           value={password} 
//           onChange={e => setPassword(e.target.value)} 
//           required 
//         />
//         <button type="submit" className="btn">Login</button>
//       </form>

//       <p className="register-link">
//         Don't have an account? <Link to="/register">Sign up / Register</Link>
//       </p>
//     </div>
//   );
// }
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) navigate("/dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // Backend should return token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      navigate("/dashboard", { replace: true });

    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 w-96 rounded shadow"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
          No account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}