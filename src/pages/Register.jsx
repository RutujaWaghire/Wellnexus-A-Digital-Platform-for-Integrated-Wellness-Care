import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Stethoscope } from "lucide-react";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();
const [confirmPassword, setConfirmPassword] = useState("");
  // ✅ Redirect logged-in users based on role
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

     if (!agreed) {
  alert("Please agree to the terms and conditions");
  return;
}
if (password !== confirmPassword) {
  alert("Passwords do not match");
  return;
}
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          password,
          role: userType.toUpperCase(),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || "Registration failed");
      }
      

      await res.text();

      alert("Registration successful. Please login.");
      navigate("/", { replace: true });

    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
     <div className="w-full flex flex-col items-center justify-center">

       {/* HEADER */}
    <div className="mb-8 text-center">
      <h2 className="font-display text-3xl font-bold text-[#1f3f3a]">
        Create your account
      </h2>
      <p className="mt-2 text-sm text-[#6f8f89]">
        Join Wellnexus and begin your wellness journey
      </p>
    </div>

    {/* CARD */}
    <form
      onSubmit={register}
      className="
        w-full max-w-md
        bg-white
        rounded-2xl
        px-8 py-10
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
      "
    >
       {/* ROLE SELECTION
  <div className="mb-6">
    <label className="block mb-2 text-sm font-medium text-[#1f3f3a]">
      I am a
    </label>

    <select
      className="
        w-full
        px-4 py-3
        rounded-xl
        bg-[#eef4f2]
        border border-transparent
        text-[#1f3f3a]
        focus:outline-none
        focus:ring-2
        focus:ring-[#9fc2b8]
      "
      value={userType}
      onChange={(e) => setUserType(e.target.value)}
    >
      <option value="patient">Patient</option>
      <option value="practitioner">Practitioner</option>
    </select>
  </div> */}
  {/* ROLE SELECTION */}
<div className="mb-6">
  <label className="block mb-3 text-sm font-medium text-[#1f3f3a]">
    I am a
  </label>

  <div className="grid grid-cols-2 gap-4">
    {/* PATIENT */}
    <button
      type="button"
      onClick={() => setUserType("patient")}
      className={`
        flex items-center justify-center gap-2
        h-20
        rounded-xl
        border-2
        transition-all
        ${
          userType === "patient"
            ? "border-[#2f5f59] bg-[#e6f2ef] text-[#1f3f3a]"
            : "border-[#d6e4df] bg-white text-[#6f8f89] hover:border-[#9fc2b8]"
        }
      `}
    >
      <Heart
        className={`h-5 w-5 ${
          userType === "patient" ? "text-[#2f5f59]" : "text-[#9fbdb6]"
        }`}
      />
      <span className="font-medium text-sm">Patient</span>
    </button>

    {/* PRACTITIONER */}
    <button
      type="button"
      onClick={() => setUserType("practitioner")}
      className={`
        flex items-center justify-center gap-2
        h-20
        rounded-xl
        border-2
        transition-all
        ${
          userType === "practitioner"
            ? "border-[#2f5f59] bg-[#e6f2ef] text-[#1f3f3a]"
            : "border-[#d6e4df] bg-white text-[#6f8f89] hover:border-[#9fc2b8]"
        }
      `}
    >
      <Stethoscope
        className={`h-5 w-5 ${
          userType === "practitioner"
            ? "text-[#2f5f59]"
            : "text-[#9fbdb6]"
        }`}
      />
      <span className="font-medium text-sm">Practitioner</span>
    </button>
  </div>
</div>
  

<div className="mb-5">
  <label className="block mb-2 text-sm font-medium text-[#1f3f3a]">
    Full Name
  </label>


  <input
    type="text"
    placeholder="John Doe"
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
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />
</div>

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

       <div className="mb-5">
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

    <div className="mb-5">
  <label className="block mb-2 text-sm font-medium text-[#1f3f3a]">
    Confirm Password
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
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
</div>
      
      <div className="mb-6 flex items-start gap-2 text-sm text-[#6f8f89]">
  <input
    type="checkbox"
    checked={agreed}
    onChange={(e) => setAgreed(e.target.checked)}
    className="mt-1 h-4 w-4 accent-[#2f5f59]"
  />
  <span>
    I agree to the{" "}
    <span className="text-[#2f5f59] font-medium cursor-pointer hover:underline">
      Terms & Conditions
    </span>
  </span>
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
    mb-6
  "
>
  Create Account
</button>
<p className="text-center text-sm text-[#6f8f89]">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/")}
    className="font-medium text-[#2f5f59] hover:underline cursor-pointer"
  >
    Sign in
  </span>
</p>
      </form>
    </div>
  );
}
