import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, UserRound, Mail, Lock, ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/axios";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

export default function AddAdmin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        name,
        email,
        password,
        role: "admin",
      });

      toast.success("Admin ajouté avec succès");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de l'ajout");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex">
      <Sidebar />

      <main className="flex-1 p-5 lg:p-8">
        <Header user={user} />

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl p-8 shadow-2xl"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6">
            <Shield className="text-indigo-300" size={32} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Ajouter Admin</h1>
          <p className="text-slate-400 mb-8">
            Créer un compte administrateur pour SmartClinic.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputBox icon={UserRound} placeholder="Nom admin" value={name} setValue={setName} />
            <InputBox icon={Mail} type="email" placeholder="Email admin" value={email} setValue={setEmail} />
            <InputBox icon={Lock} type="password" placeholder="Mot de passe" value={password} setValue={setPassword} />

            <button className="w-full flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white py-4 font-bold">
              <UserPlus size={20} />
              Ajouter Admin
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

function InputBox({ icon: Icon, type = "text", placeholder, value, setValue }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4">
      <Icon className="text-indigo-300" size={20} />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full py-4 bg-transparent outline-none text-white placeholder:text-slate-500"
      />
    </div>
  );
}