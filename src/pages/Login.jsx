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
    <div className="w-full flex flex-col items-center justify-center">

    <div className="mb-8 text-center">
      <h2 className="font-display text-3xl font-bold text-[#1f3f3a]">
        Welcome Back
      </h2>
      <p className="mt-2 text-sm text-[#6f8f89]">
        Sign in to continue your Wellnexus journey
      </p>
    </div>

    {/* CARD */}
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white px-8 py-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

        <div className="mb-5">
  <label className="block mb-2 text-sm font-medium text-[#1f3f3a]">
    Email Address
  </label>

  <input
    type="email"
    placeholder="you@example.com"
    className="
      w-full
      px-4 py-3
      rounded-xl
      bg-[#eef4f2]
      border border-transparent
      text-[#1f3f3a]
      placeholder-[#8fa5a0]
      focus:outline-none
      focus:ring-2
      focus:ring-[#9fc2b8]
    "
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
</div>
      <div className="mb-6">
  <label className="block mb-2 text-sm font-medium text-[#1f3f3a]">
    Password
  </label>

  <input
    type="password"
    placeholder="••••••••"
    className="
      w-full
      px-4 py-3
      rounded-xl
      bg-[#eef4f2]
      border border-transparent
      text-[#1f3f3a]
      placeholder-[#8fa5a0]
      focus:outline-none
      focus:ring-2
      focus:ring-[#9fc2b8]
    "
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</div>

    <div className="mb-6 flex items-center justify-between text-sm">
  <label className="flex items-center gap-2 text-[#6f8f89]">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-[#9fc2b8] text-[#2f5f59] focus:ring-[#9fc2b8]"
    />
    Remember me
  </label>

  <button
    type="button"
    className="text-[#2f5f59] hover:underline font-medium"
  >
    Forgot password?
  </button>
</div>
<button
  type="submit"
  className="
    w-full
    py-3
    rounded-xl
    bg-[#2f5f59]
    text-white
    font-semibold
    text-sm
    hover:bg-[#274f4a]
    transition-colors
  "
>
  Sign In
</button>

    <div className="my-8 flex items-center gap-3">
  <div className="flex-1 h-px bg-[#e2ece9]" />
  <span className="text-xs text-[#8fa5a0]">
    Or continue with
  </span>
  <div className="flex-1 h-px bg-[#e2ece9]" />
</div>

    <div className="flex gap-4 mb-6">
  <button
    type="button"
    className="
      flex-1
      flex items-center justify-center gap-2
      py-3
      rounded-xl
      border border-[#b6d0c9]
      text-sm font-medium
      text-[#2f5f59]
      hover:bg-[#eef4f2]
      transition-colors
    "
  >
    Google
  </button>

  <button
    type="button"
    className="
      flex-1
      flex items-center justify-center gap-2
      py-3
      rounded-xl
      border border-[#b6d0c9]
      text-sm font-medium
      text-[#2f5f59]
      hover:bg-[#eef4f2]
      transition-colors
    "
  >
    GitHub
  </button>
</div>
 
        <p className="mt-6 text-center text-sm text-[#6f8f89]">
  Don’t have an account?{" "}
  <Link
    to="/register"
    className="font-medium text-[#2f5f59] hover:underline"
  >
    Create account
  </Link>
</p>
      </form>
    </div>
  );
}
