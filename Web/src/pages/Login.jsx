import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toastStyle = {
    background: "rgba(255, 255, 255, 0.75)",
    backdropFilter: "blur(10px)",
    color: "#1a2a3a",
    borderRadius: "20px",
    border: "1px solid rgba(130, 188, 224, 0.3)",
    fontWeight: "600",
    fontSize: "15px",
    padding: "16px 24px",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-4">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          },
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white/40"
      >
        <div className="hidden md:flex md:w-1/2 bg-[#1a2a3a] relative items-center justify-center p-12">
          <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')]"></div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="z-10 text-center"
          >
            <img
              src="/logo.jpg"
              alt="Smart Clinic"
              className="w-48 h-48 object-cover rounded-full border-4 border-[#82BCE0] shadow-glow mb-6"
            />

            <h1 className="text-white text-4xl font-bold tracking-wider">
              SmartClinic
            </h1>

            <p className="text-blue-200 text-sm mt-2">
              Votre santé, notre priorité digitale.
            </p>
          </motion.div>

          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-[#82BCE0] rounded-full blur-[80px] opacity-30"></div>
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue</h2>

          <p className="text-gray-500 mb-8">
            Connectez-vous à votre espace médical
          </p>

          <div className="space-y-6">
            <input
              type="email"
              placeholder="Email Professionnel"
              value={email}
              className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#82BCE0] focus:ring-2 focus:ring-[#82BCE0]/20 transition-all text-gray-700 placeholder-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#82BCE0] focus:ring-2 focus:ring-[#82BCE0]/20 transition-all text-gray-700 placeholder-gray-400"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleLogin}
              className="w-full bg-[#6FAED6] hover:bg-[#5FA3CF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200/50 transition-all mt-4 tracking-wide"
            >
              Se connecter
            </motion.button>
          </div>

          <div className="flex justify-between mt-10 text-sm font-semibold">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-gray-400 hover:text-[#82BCE0] cursor-pointer transition-colors"
            >
              Mot de passe oublié ?
            </span>

            <span
              onClick={() => navigate("/register")}
              className="text-[#6FAED6] hover:text-[#5FA3CF] hover:underline cursor-pointer"
            >
              Créer un compte
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;