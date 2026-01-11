import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔁 Auto redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) return;

    if (user.role === "ADMIN") navigate("/admin-dashboard", { replace: true });
    if (user.role === "PATIENT") navigate("/patient-dashboard", { replace: true });
    if (user.role === "PRACTITIONER") navigate("/practitioner-dashboard", { replace: true });
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      // ✅ JWT returned as plain text
      const token = await res.text();

      // ✅ Decode JWT
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);

      // 🔥 NORMALIZE ROLE (THIS IS THE KEY FIX)
      let role = decoded.role;              // ROLE_ADMIN
      if (role.startsWith("ROLE_")) {
        role = role.replace("ROLE_", "");   // ADMIN
      }

      // ✅ Save auth
      localStorage.setItem("token", token);
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ email, role })
      );

      // ✅ Redirect
      if (role === "ADMIN") {
        navigate("/admin-dashboard", { replace: true });
      } else if (role === "PATIENT") {
        navigate("/patient-dashboard", { replace: true });
      } else if (role === "PRACTITIONER") {
        navigate("/practitioner-dashboard", { replace: true });
      } else {
        throw new Error("Unknown role");
      }

    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 w-96 rounded shadow">
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

        <button className="w-full bg-green-600 text-white py-2 rounded">
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
