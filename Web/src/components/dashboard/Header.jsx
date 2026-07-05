import { Bell, Search, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import ProfileDropdown from "./ProfileDropdown";

export default function Header({ user }) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Bonjour"
      : hour < 18
      ? "Bon après-midi"
      : "Bonsoir";

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
    >
      {/* Message de bienvenue */}
      <div className="flex items-center gap-4">
        

        <div>
          <h2 className="text-2xl font-extrabold text-white lg:text-3xl">
            {greeting}
            <span className="text-[#4A7FA7]">.</span>
          </h2>

          <p className="mt-1 text-sm text-[#B3CFE5]">
            Heureux de vous revoir,{" "}
            <span className="font-bold text-white">
              {user?.name || "Utilisateur"}
            </span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Recherche */}
       

        {/* Notifications */}
        <motion.button
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/75 text-[#B3CFE5] shadow-lg shadow-[#0A1931]/20 backdrop-blur-xl transition hover:border-[#4A7FA7]/50 hover:bg-[#1A3D63]"
        >
          <Bell size={19} />

          <motion.span
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-400"
          />
        </motion.button>

        {/* Profil */}
        <div className="rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B]/75 p-1 shadow-lg shadow-[#0A1931]/20 backdrop-blur-xl">
          <ProfileDropdown user={user} />
        </div>
      </div>
    </motion.header>
  );
}