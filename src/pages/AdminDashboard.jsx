import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Admin protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || user.role !== "ADMIN") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // 📥 Fetch practitioners (ADMIN API)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Admin token missing. Please login again.");
      navigate("/", { replace: true });
      return;
    }

    fetch("http://localhost:8080/api/admin/practitioners", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Failed to fetch practitioners");
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Practitioners from API:", data);
        setPractitioners(data);
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err.message);
        alert("Error loading practitioners");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // ✅ Verify practitioner
  const verifyPractitioner = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/practitioners/${id}/verify`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ verified: true }),
        }
      );

      if (!res.ok) {
        throw new Error("Verification failed");
      }

      // 🔄 Update UI immediately
      setPractitioners((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, verified: true } : p
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </div>

      {loading ? (
        <p>Loading practitioners...</p>
      ) : practitioners.length === 0 ? (
        <p>No practitioners found</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {practitioners.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.user.name}
                  {p.verified && (
                    <span className="text-green-600 ml-1">✔</span>
                  )}
                </td>
                <td>{p.user.email}</td>
                <td>{p.specialization}</td>
                <td>{p.verified ? "Verified" : "Pending"}</td>
                <td>
                  {!p.verified && (
                    <button onClick={() => verifyPractitioner(p.id)}>
                      Verify
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
