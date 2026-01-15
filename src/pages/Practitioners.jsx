import { useEffect, useState } from "react";

export default function Practitioners() {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/practitioners") // 👈 your GET API
      .then(res => res.json())
      .then(data => setPractitioners(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Practitioners</h2>

      {practitioners.map(practitioner => (
        <div
          key={practitioner.id}
          className="border p-4 mb-3 rounded flex items-center justify-between"
        >
          {/* 👇 NAME + GREEN TICK */}
          <h3 className="text-lg font-semibold flex items-center">
            {practitioner.name}

            {practitioner.verified && (
              <span
                className="ml-2 text-green-600 text-lg"
                title="Verified Practitioner"
              >
                ✔
              </span>
            )}
          </h3>

          <p className="text-sm text-gray-600">
            {practitioner.specialization}
          </p>
        </div>
      ))}
    </div>
  );
}
