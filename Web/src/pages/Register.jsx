import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toaster

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Alert dyal l-loading
    const loadingToast = toast.loading("Création de votre compte...");

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });

      // ✅ Success Toast (Nfs style dyal Login)
      toast.success("Compte créé avec succès ! 🎉", {
        id: loadingToast,
        style: {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          color: "#1a2a3a",
          borderRadius: "20px",
          border: "1px solid rgba(130, 188, 224, 0.3)",
          fontWeight: "600",
          fontSize: "15px",
          padding: "16px 24px",
        },
      });

      setTimeout(() => navigate("/"), 2000); // Redirection l-login

    } catch (err) {
      console.log(err.response?.data);
      
      // ❌ Error Toast
      toast.error("Erreur lors de l'inscription ❌", {
        id: loadingToast,
        style: {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          color: "#b91c1c",
          borderRadius: "20px",
          border: "1px solid rgba(239, 68, 68, 0.3)",
          fontWeight: "600",
          fontSize: "15px",
          padding: "16px 24px",
        },
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-4">
      
      {/* Toaster dyal les alertes */}
      <Toaster position="top-center" />

      {/* CONTAINER PRINCIPAL */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row w-full max-w-4xl bg-white/30 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden border border-white/40"
      >
        
        {/* SECTION GAUCHE */}
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
            <h1 className="text-white text-4xl font-bold tracking-wider">SmartClinic</h1>
            <p className="text-blue-200 text-sm mt-2">Rejoignez notre réseau médical digital.</p>
          </motion.div>

          <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-[#82BCE0] rounded-full blur-[80px] opacity-30"></div>
        </div>

        {/* SECTION DROITE (Formulaire) */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Inscription</h2>
          <p className="text-gray-500 mb-8">Créez votre compte en quelques secondes</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Nom complet"
              required
              className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#82BCE0] focus:ring-2 focus:ring-[#82BCE0]/20 transition-all text-gray-700 placeholder-gray-400"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Professionnel"
              required
              className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#82BCE0] focus:ring-2 focus:ring-[#82BCE0]/20 transition-all text-gray-700 placeholder-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              required
              className="w-full bg-white/50 border border-gray-200 rounded-2xl py-4 px-6 outline-none focus:border-[#82BCE0] focus:ring-2 focus:ring-[#82BCE0]/20 transition-all text-gray-700 placeholder-gray-400"
              onChange={(e) => setPassword(e.target.value)}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-[#6FAED6] hover:bg-[#5FA3CF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all mt-4 tracking-wide"
            >
              Créer mon compte
            </motion.button>
          </form>

          {/* Lien vers Login */}
          <div className="mt-8 text-center text-sm font-semibold">
            <span className="text-gray-400">Déjà membre ? </span>
            <span 
              onClick={() => navigate("/")}
              className="text-[#6FAED6] hover:text-[#5FA3CF] hover:underline cursor-pointer transition-colors"
            >
              Se connecter ici
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;