import { useEffect, useState } from "react";

export default function Practitioners() {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/practitioners")
      .then((res) => res.json())
      .then((data) => setPractitioners(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f8f6] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#2f5f59]">
            Our Wellness Practitioners
          </h2>
          <p className="mt-2 text-[#6f8f89]">
            Connect with experienced and verified professionals
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-[#6f8f89]">Loading practitioners...</p>
        )}

        {/* Empty state */}
        {!loading && practitioners.length === 0 && (
          <p className="text-[#6f8f89]">
            No practitioners available at the moment.
          </p>
        )}

        {/* Practitioner Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {practitioners.map((practitioner) => (
            <div
              key={practitioner.id}
              className="
                bg-white
                rounded-2xl
                border border-[#e3ece8]
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                transition
                hover:-translate-y-1
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
              "
            >
              {/* Name + verification */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-[#2f3e3a]">
                  {practitioner.name}
                </h3>

                {practitioner.verified && (
                  <span
                    className="
                      text-xs
                      px-3 py-1
                      rounded-full
                      bg-green-100
                      text-green-700
                      font-medium
                    "
                  >
                    Verified
                  </span>
                )}
              </div>

              {/* Specialization */}
              <p className="text-sm text-[#6b7c77]">
                <span className="font-medium text-[#3f6f68]">
                  Specialization:
                </span>{" "}
                {practitioner.specialization || "Not specified"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
