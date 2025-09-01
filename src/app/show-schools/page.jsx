"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/get-schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading schools...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Schools Directory</h1>
      {schools.length === 0 ? (
        <p className="text-center text-gray-600">No schools found. Please add one first.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="border rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={school.image_url}
                alt={school.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{school.name}</h2>
              <p className="text-gray-700">{school.address}</p>
              <p className="text-gray-500">{school.city}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
