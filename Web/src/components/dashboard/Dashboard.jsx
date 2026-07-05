import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Users, Stethoscope, CalendarDays, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCard from "./StatCard";
import LoadingSpinner from "./LoadingSpinner";
import DashboardChart from "./DashboardChart";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    rendezvous: 0,
  });

  const [latestDoctors, setLatestDoctors] = useState([]);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorPage] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const token = localStorage.getItem("token");
  const role = user.role || localStorage.getItem("role") || "admin";

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (role === "patient") {
      navigate("/specialities");
      return;
    }

    getDashboard();
  }, []);

  const getDashboard = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setStats({
        patients: response.data.patients || 0,
        doctors: response.data.doctors || 0,
        rendezvous: response.data.rendezvous || 0,
      });

      setLatestDoctors(response.data.latest_doctors || []);
      setLatestUsers(response.data.latest_users || []);
    } catch (error) {
      setErrorPage(true);
      toast.error("Erreur lors du chargement du dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (errorPage) {
    return <ErrorState message="Impossible de charger le dashboard." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex">
      <Sidebar />

      <main className="flex-1 p-5 lg:p-8">
        <Header user={user} />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-white text-2xl font-bold">
                Clinic Overview
              </h1>
              <p className="text-slate-400">
                {role === "secretary"
                  ? "View SmartClinic statistics."
                  : "Manage your SmartClinic data professionally."}
              </p>
            </div>

            {role === "admin" && (
              <Link
                to="/add-doctor"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-3 font-semibold shadow-lg shadow-indigo-500/20"
              >
                <PlusCircle size={20} />
                Add Doctor
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Patients"
              value={stats.patients}
              icon={Users}
              color="bg-blue-500"
              trend="+12% this month"
            />

            <StatCard
              title="Doctors"
              value={stats.doctors}
              icon={Stethoscope}
              color="bg-emerald-500"
              trend="+8% this month"
            />

            <StatCard
              title="Rendezvous"
              value={stats.rendezvous}
              icon={CalendarDays}
              color="bg-orange-500"
              trend="+5% this month"
            />
          </div>

          <DashboardChart
            patients={stats.patients}
            doctors={stats.doctors}
            rendezvous={stats.rendezvous}
          />

          {role === "admin" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
                <h3 className="text-white font-bold mb-5">Latest Doctors</h3>

                {latestDoctors.length === 0 ? (
                  <EmptyState text="No doctors found yet." />
                ) : (
                  <div className="space-y-4">
                    {latestDoctors.slice(0, 5).map((doctor) => (
                      <div
                        key={doctor.id}
                        className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 hover:bg-white/20 transition"
                      >
                        <img
                          src={
                            doctor.photo
                              ? `http://127.0.0.1:8000/storage/doctors/${doctor.photo}`
                              : `https://ui-avatars.com/api/?name=${doctor.name}`
                          }
                          alt={doctor.name}
                          className="w-12 h-12 rounded-2xl object-cover"
                        />

                        <div>
                          <p className="text-white font-semibold">
                            {doctor.name}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {doctor.specialite || "Specialite"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
                <h3 className="text-white font-bold mb-5">Latest Users</h3>

                {latestUsers.length === 0 ? (
                  <EmptyState text="No users found yet." />
                ) : (
                  <div className="space-y-4">
                    {latestUsers.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 hover:bg-white/20 transition"
                      >
                        <img
                          src={`https://ui-avatars.com/api/?name=${item.name}`}
                          alt={item.name}
                          className="w-12 h-12 rounded-2xl"
                        />

                        <div>
                          <p className="text-white font-semibold">
                            {item.name}
                          </p>
                          <p className="text-slate-400 text-sm">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}