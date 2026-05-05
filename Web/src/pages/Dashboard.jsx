import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    rendezvous: 0,
  });

  const role = localStorage.getItem("role");

  // ✅ redirect ديال patient
  useEffect(() => {
    if (role === "patient") {
      window.location.href = "/specialities";
    }
  }, [role]);

  // ✅ جلب stats
  useEffect(() => {
    if (role !== "patient") {
      getStats();
    }
  }, [role]);

  const getStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Smart Clinic
          </p>
        </div>

        <div className="flex gap-3">

          {/* ✅ زر Add Doctor (غير admin) */}
          {role === "admin" && (
            <button
              onClick={() => (window.location.href = "/add-doctor")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow"
            >
              + Add Doctor
            </button>
          )}

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-xl shadow"
          >
            Logout
          </button>

        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Patients */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <h2 className="text-gray-500">Patients</h2>
          <p className="text-4xl font-bold text-blue-500 mt-2">
            {stats.patients}
          </p>
        </div>

        {/* Doctors */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <h2 className="text-gray-500">Doctors</h2>
          <p className="text-4xl font-bold text-green-500 mt-2">
            {stats.doctors}
          </p>
        </div>

        {/* Rendez-vous */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:scale-105 transition">
          <h2 className="text-gray-500">Rendez-vous</h2>
          <p className="text-4xl font-bold text-purple-500 mt-2">
            {stats.rendezvous}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;