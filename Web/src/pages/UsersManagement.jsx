import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Search,
  Pencil,
  Trash2,
  X,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  UserRound,
  Mail,
  Phone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import LoadingSpinner from "../components/dashboard/LoadingSpinner";
import EmptyState from "../components/dashboard/EmptyState";

export default function UsersManagement({
  title,
  subtitle,
  searchPlaceholder,
  emptyText,
  apiUrl,
  roleName,
}) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role || localStorage.getItem("role") || "admin";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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

    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setUsers(
        res.data.users ||
          res.data.admins ||
          res.data.secretaries ||
          res.data ||
          []
      );
    } catch (error) {
      toast.error("Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (item) => {
    setEditUser(item);
    setForm({
      name: item.name || "",
      email: item.email || "",
      phone: item.phone || "",
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${apiUrl}/${editUser.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      toast.success(`${roleName} modifié avec succès`);
      setEditUser(null);
      getUsers();
    } catch (error) {
      toast.error("Erreur lors de la modification");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/${deleteUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      toast.success(`${roleName} supprimé avec succès`);
      setDeleteUser(null);
      getUsers();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const filteredUsers = users.filter((item) =>
    `${item.name || ""} ${item.email || ""} ${item.phone || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage) || 1;

  const displayedUsers = filteredUsers.slice(
    (page - 1) * perPage,
    page * perPage
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] text-white">
      <div className="relative flex min-h-screen">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -70, 0], y: [0, 55, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]"
        />

        <Sidebar />

        <main className="relative z-10 flex-1 p-5 lg:p-8">
          <Header user={user} />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
                    Gestion des utilisateurs
                  </p>

                  <h1 className="text-2xl font-extrabold text-white lg:text-3xl">
                    {title}
                  </h1>

                  <p className="mt-2 text-sm text-[#F6FAFD]/75">
                    {subtitle}
                  </p>
                </div>

                <div className="flex w-full items-center gap-3 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 py-3 shadow-lg shadow-[#0A1931]/20 transition focus-within:border-[#4A7FA7]/70 lg:w-96">
                  <Search className="text-[#B3CFE5]" size={19} />
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[#B3CFE5]/55"
                  />
                </div>
              </div>
            </div>

            {displayedUsers.length === 0 ? (
              <div className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 backdrop-blur-xl">
                <EmptyState text={emptyText} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {displayedUsers.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -6 }}
                      className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-6 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl transition"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://ui-avatars.com/api/?name=${
                            item.name || roleName
                          }&background=102A4B&color=B3CFE5`}
                          alt={item.name}
                          className="h-16 w-16 rounded-2xl border border-[#B3CFE5]/20 object-cover"
                        />

                        <div>
                          <h3 className="text-lg font-extrabold text-white">
                            {item.name}
                          </h3>

                          <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-[#B3CFE5]">
                            {roleName === "Admin" ? (
                              <ShieldCheck size={15} />
                            ) : (
                              <UserRound size={15} />
                            )}
                            {roleName}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 text-sm">
                        <p className="flex items-center gap-2 text-[#B3CFE5]">
                          <Mail size={15} />
                          <span className="text-white">
                            {item.email || "Non disponible"}
                          </span>
                        </p>

                        <p className="flex items-center gap-2 text-[#B3CFE5]">
                          <Phone size={15} />
                          <span className="text-white">
                            {item.phone || "Non disponible"}
                          </span>
                        </p>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => openEdit(item)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70 py-3 text-sm font-bold text-[#B3CFE5] transition hover:bg-[#4A7FA7] hover:text-white"
                        >
                          <Pencil size={17} />
                          Modifier
                        </button>

                        <button
                          onClick={() => setDeleteUser(item)}
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/15 bg-red-500/10 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500/20"
                        >
                          <Trash2 size={17} />
                          Supprimer
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 p-3 text-[#B3CFE5] transition hover:bg-[#1A3D63] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft />
                  </button>

                  <span className="rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 px-5 py-3 text-sm font-bold text-white">
                    Page {page} / {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/80 p-3 text-[#B3CFE5] transition hover:bg-[#1A3D63] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </main>

        {editUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1931]/85 p-4 backdrop-blur-sm">
            <form
              onSubmit={updateUser}
              className="w-full max-w-lg rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745] p-6 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B3CFE5]">
                    Modification
                  </p>

                  <h2 className="mt-1 text-xl font-extrabold text-white">
                    Modifier {roleName}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setEditUser(null)}
                  className="rounded-xl bg-[#0A1931]/70 p-2 text-[#B3CFE5] transition hover:bg-[#1A3D63]"
                >
                  <X />
                </button>
              </div>

              {[
                ["name", "Nom complet"],
                ["email", "Adresse e-mail"],
                ["phone", "Téléphone"],
              ].map(([field, label]) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={label}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="mb-4 w-full rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#B3CFE5]/45 focus:border-[#4A7FA7]/70"
                />
              ))}

              <button className="w-full rounded-xl bg-gradient-to-r from-[#1A3D63] via-[#4A7FA7] to-[#B3CFE5] py-3 text-sm font-extrabold text-white shadow-xl shadow-[#4A7FA7]/25">
                Enregistrer les modifications
              </button>
            </form>
          </div>
        )}

        {deleteUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1931]/85 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745] p-6 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-300">
                <Trash2 size={35} />
              </div>

              <h2 className="mb-2 text-xl font-extrabold text-white">
                Supprimer cet utilisateur ?
              </h2>

              <p className="mb-6 text-sm leading-6 text-[#B3CFE5]">
                Voulez-vous vraiment supprimer{" "}
                <span className="font-bold text-white">{deleteUser.name}</span>{" "}
                ?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteUser(null)}
                  className="flex-1 rounded-xl border border-[#B3CFE5]/20 bg-[#0A1931]/55 py-3 text-sm font-bold text-[#B3CFE5] transition hover:bg-[#1A3D63]"
                >
                  Annuler
                </button>

                <button
                  onClick={confirmDelete}
                  className="flex-1 rounded-xl bg-red-500/90 py-3 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}