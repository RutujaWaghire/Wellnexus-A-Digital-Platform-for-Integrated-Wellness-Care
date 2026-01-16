import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Stethoscope } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");

  const navigate = useNavigate();

  // 🔁 Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user?.role === "PATIENT") {
      navigate("/patient-dashboard", { replace: true });
    } else if (user?.role === "PRACTITIONER") {
      navigate("/practitioner-dashboard", { replace: true });
    }
  }, [navigate]);

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          password,
          role: userType.toUpperCase(), // 🔥 BACKEND MATCH
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Registration failed");
      }

      alert("Registration successful. Please login.");
      navigate("/", { replace: true });
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#eef4f2] via-[#f7faf9] to-[#ffffff] px-4">
      <form
        onSubmit={register}
        className="
          w-full max-w-md
          bg-white
          rounded-2xl
          px-8 py-10
          shadow-[0_12px_40px_rgba(0,0,0,0.08)]
        "
      >
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1f3f3a]">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-[#6f8f89]">
            Begin your wellness journey with Wellnexus
          </p>
        </div>

        {/* ROLE SELECT */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-[#1f3f3a]">
            I am a
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setUserType("patient")}
              className={`
                flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition
                ${
                  userType === "patient"
                    ? "border-[#2f5f59] bg-[#e6f2ef] text-[#1f3f3a]"
                    : "border-[#d6e4df] text-[#6f8f89] hover:border-[#9fc2b8]"
                }
              `}
            >
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Patient</span>
            </button>

            <button
              type="button"
              onClick={() => setUserType("practitioner")}
              className={`
                flex items-center justify-center gap-2 h-14 rounded-xl border-2 transition
                ${
                  userType === "practitioner"
                    ? "border-[#2f5f59] bg-[#e6f2ef] text-[#1f3f3a]"
                    : "border-[#d6e4df] text-[#6f8f89] hover:border-[#9fc2b8]"
                }
              `}
            >
              <Stethoscope className="h-5 w-5" />
              <span className="text-sm font-medium">Practitioner</span>
            </button>
          </div>
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            className="
              w-full px-4 py-3 rounded-xl
              bg-[#eef4f2] text-[#1f3f3a]
              placeholder-[#8fa5a0]
              focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
            "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="
              w-full px-4 py-3 rounded-xl
              bg-[#eef4f2] text-[#1f3f3a]
              placeholder-[#8fa5a0]
              focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-[#1f3f3a]">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="
              w-full px-4 py-3 rounded-xl
              bg-[#eef4f2] text-[#1f3f3a]
              placeholder-[#8fa5a0]
              focus:outline-none focus:ring-2 focus:ring-[#9fc2b8]
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-xl
            bg-[#2f5f59] text-white font-semibold
            hover:bg-[#274f4a] transition
          "
        >
          Create Account
        </button>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-[#6f8f89]">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#2f5f59] font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}
