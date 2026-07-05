import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Mail,
  Lock,
  Eye,
  LogIn,
  UserPlus,
  CalendarDays,
  Users,
  BarChart3,
  ShieldCheck,
  HeartPulse,
  Sun,
} from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toastStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    color: "#0A1931",
    borderRadius: "18px",
    border: "1px solid rgba(179, 207, 229, 0.6)",
    fontWeight: "600",
    fontSize: "14px",
    padding: "14px 20px",
  };

  const handleLogin = async () => {
    const loadingToast = toast.loading("Vérification...");

    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      toast.success("Bienvenue sur SmartClinic ✅", {
        id: loadingToast,
        style: toastStyle,
      });

      setTimeout(() => {
        if (user.role === "patient") {
          navigate("/specialities");
        } else if (user.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      toast.error("Identifiants incorrects ❌", {
        id: loadingToast,
        style: {
          ...toastStyle,
          color: "#b91c1c",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        },
      });
    }
  };

  const features = [
    {
      icon: CalendarDays,
      title: "Rendez-vous",
      text: "Planifiez et gérez facilement",
    },
    {
      icon: Users,
      title: "Patients",
      text: "Accédez aux dossiers en toute sécurité",
    },
    {
      icon: BarChart3,
      title: "Statistiques",
      text: "Suivez l'activité de votre cabinet",
    },
    {
      icon: ShieldCheck,
      title: "Sécurité",
      text: "Vos données sont protégées",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF5FF] via-[#F6FAFD] to-[#DCEEFF] p-2">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="mx-auto flex min-h-[calc(100vh-16px)] max-w-[1050px] overflow-hidden rounded-[28px] bg-[#F6FAFD] shadow-2xl"
      >
        {/* LEFT SIDE */}
        <div className="relative hidden w-[43%] overflow-hidden bg-[#0A1931] p-8 text-white lg:block">
          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-28 top-28 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/70"
          />

          <motion.div
            animate={{ y: [0, 18, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-40 top-60 h-[430px] w-[430px] rounded-full bg-[#4A7FA7]/50"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 12px rgba(74,127,167,0.4)",
                    "0 0 28px rgba(74,127,167,0.8)",
                    "0 0 12px rgba(74,127,167,0.4)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#B3CFE5] to-[#1A3D63]"
              >
                <HeartPulse size={25} />
              </motion.div>

              <div>
                <h1 className="text-2xl font-extrabold">
                  Smart<span className="text-[#6DA8FF]">Clinic</span>
                </h1>
                <p className="text-xs text-[#B3CFE5]">
                  Votre santé, notre priorité
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-extrabold leading-tight">
                Bienvenue
                <span className="block text-[#8CB9FF]">sur SmartClinic</span>
              </h2>

              <div className="mt-5 h-1 w-12 rounded-full bg-[#6DA8FF]" />

              <p className="mt-6 max-w-sm text-sm leading-7 text-[#F6FAFD]/90">
                Gérez vos patients, vos rendez-vous et votre cabinet médical en
                toute simplicité.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * index }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1A3D63] text-[#B3CFE5]">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="text-xs text-[#B3CFE5]">{item.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mt-9 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
            >
              <ShieldCheck size={28} className="text-[#B3CFE5]" />
              <div>
                <h3 className="text-sm font-bold">Conforme aux normes</h3>
                <p className="text-xs text-[#B3CFE5]">
                  Données sécurisées et confidentielles
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-1 items-center justify-center bg-[#F6FAFD] p-5 lg:p-8">
          

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl shadow-[#B3CFE5]/40"
            >
              <Lock size={32} className="text-[#1A3D63]" />
            </motion.div>

            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#0A1931]">
                Connexion
              </h2>
              <p className="mt-2 text-sm text-[#1A3D63]/75">
                Connectez-vous à votre compte
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-[#0A1931]">
                  Adresse e-mail
                </label>

                <div className="flex h-12 items-center rounded-xl border border-[#D8E6F3] bg-white shadow-sm focus-within:border-[#4A7FA7] focus-within:ring-4 focus-within:ring-[#B3CFE5]/40">
                  <div className="flex h-full w-12 items-center justify-center border-r border-[#D8E6F3] text-[#1A3D63]">
                    <Mail size={19} />
                  </div>

                  <input
                    type="email"
                    placeholder="Entrez votre adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-full flex-1 bg-transparent px-4 text-sm text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#0A1931]">
                  Mot de passe
                </label>

                <div className="flex h-12 items-center rounded-xl border border-[#D8E6F3] bg-white shadow-sm focus-within:border-[#4A7FA7] focus-within:ring-4 focus-within:ring-[#B3CFE5]/40">
                  <div className="flex h-full w-12 items-center justify-center border-r border-[#D8E6F3] text-[#1A3D63]">
                    <Lock size={19} />
                  </div>

                  <input
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleLogin();
                    }}
                    className="h-full flex-1 bg-transparent px-4 text-sm text-[#0A1931] outline-none placeholder:text-[#1A3D63]/45"
                  />

                  <div className="flex h-full w-12 items-center justify-center text-[#1A3D63]">
                    <Eye size={19} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold">
                <label className="flex items-center gap-2 text-[#0A1931]">
                 
                </label>

                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-[#1A3D63] hover:text-[#4A7FA7]"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogin}
                className="relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#0A3D91] text-sm font-bold text-white shadow-xl shadow-[#1A3D63]/25"
              >
                <motion.span
                  animate={{ x: ["-140%", "150%"] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-y-0 w-24 bg-white/20 blur-xl"
                />
                <LogIn size={19} />
                Se connecter
              </motion.button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#D8E6F3]" />
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1A3D63]">
                  ou
                </span>
                <div className="h-px flex-1 bg-[#D8E6F3]" />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/register")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D8E6F3] bg-white text-sm font-bold text-[#0A3D91] hover:bg-[#B3CFE5]/15"
              >
                <UserPlus size={19} />
                Créer un compte
              </motion.button>

             
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;