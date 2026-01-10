import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">Welcome {user?.username ?? "Guest"}</h1>
      <button onClick={logout} className="mt-4 bg-red-600 text-white py-1 px-3 rounded">Logout</button>
    </div>
  );
}