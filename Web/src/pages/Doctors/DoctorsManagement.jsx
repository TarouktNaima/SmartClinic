import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Search,
  Pencil,
  Trash2,
  X,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import LoadingSpinner from "../../components/dashboard/LoadingSpinner";
import EmptyState from "../../components/dashboard/EmptyState";

export default function DoctorsManagement() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || localStorage.getItem("role") || "admin";

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [editDoctor, setEditDoctor] = useState(null);
  const [deleteDoctor, setDeleteDoctor] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialite: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "admin") {
      navigate(role === "patient" ? "/specialities" : "/dashboard");
      return;
    }

    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setDoctors(res.data.doctors || res.data || []);
    } catch (error) {
      toast.error("Erreur lors du chargement des médecins");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (doctor) => {
    setEditDoctor(doctor);
    setForm({
      name: doctor.name || "",
      email: doctor.email || "",
      phone: doctor.phone || "",
      specialite: doctor.specialite || "",
    });
  };

  const updateDoctor = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/doctors/${editDoctor.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Doctor updated successfully");
      setEditDoctor(null);
      getDoctors();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Erreur lors de la modification");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/doctors/${deleteDoctor.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      toast.success("Doctor deleted successfully");
      setDeleteDoctor(null);
      getDoctors();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name || ""} ${doctor.email || ""} ${doctor.phone || ""} ${
      doctor.specialite || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / perPage) || 1;

  const displayedDoctors = filteredDoctors.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) return <LoadingSpinner />;

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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Doctors Management
              </h1>
              <p className="text-slate-400">
                Search, edit and manage doctors professionally.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 w-full lg:w-96">
              <Search className="text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search doctor..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent outline-none text-white placeholder:text-slate-400 w-full"
              />
            </div>
          </div>

          {displayedDoctors.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
              <EmptyState text="No doctors found." />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedDoctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          doctor.photo
                            ? `http://127.0.0.1:8000/storage/doctors/${doctor.photo}`
                            : `https://ui-avatars.com/api/?name=${doctor.name}`
                        }
                        alt={doctor.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />

                      <div>
                        <h3 className="text-white font-bold text-lg">
                          {doctor.name}
                        </h3>

                        <p className="text-indigo-300 text-sm flex items-center gap-1">
                          <Stethoscope size={15} />
                          {doctor.specialite || "Specialite"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2 text-sm">
                      <p className="text-slate-400">
                        Email:{" "}
                        <span className="text-white">
                          {doctor.email || "N/A"}
                        </span>
                      </p>

                      <p className="text-slate-400">
                        Phone:{" "}
                        <span className="text-white">
                          {doctor.phone || "N/A"}
                        </span>
                      </p>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => openEdit(doctor)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 py-3"
                      >
                        <Pencil size={18} />
                        Edit
                      </button>

                      <button
                        onClick={() => setDeleteDoctor(doctor)}
                        className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-200 py-3"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-3 rounded-2xl bg-white/10 text-white disabled:opacity-40"
                >
                  <ChevronLeft />
                </button>

                <span className="text-white">
                  Page {page} / {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-3 rounded-2xl bg-white/10 text-white disabled:opacity-40"
                >
                  <ChevronRight />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </main>

      {editDoctor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={updateDoctor}
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6"
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-white text-xl font-bold">Edit Doctor</h2>

              <button type="button" onClick={() => setEditDoctor(null)}>
                <X className="text-white" />
              </button>
            </div>

            {["name", "email", "phone", "specialite"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field}
                value={form[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full mb-4 rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500"
              />
            ))}

            <button className="w-full rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white py-3 font-semibold">
              Save Changes
            </button>
          </form>
        </div>
      )}

      {deleteDoctor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 text-center">
            <Trash2 className="mx-auto text-red-400 mb-4" size={45} />

            <h2 className="text-white text-xl font-bold mb-2">
              Delete Doctor?
            </h2>

            <p className="text-slate-400 mb-6">
              Are you sure you want to delete {deleteDoctor.name}?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteDoctor(null)}
                className="flex-1 rounded-2xl bg-white/10 text-white py-3"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-2xl bg-red-500 hover:bg-red-600 text-white py-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}