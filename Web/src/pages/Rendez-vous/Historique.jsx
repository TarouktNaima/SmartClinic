import { motion } from "framer-motion";
import { History, CalendarDays } from "lucide-react";

export default function Historique() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#0A1931] px-5 py-8 text-white md:px-10">
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -left-44 -top-44 h-[380px] w-[380px] rounded-full bg-[#1A3D63]/60 blur-[120px]"
      />

      <motion.div
        animate={{ x: [0, -70, 0], y: [0, 55, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none fixed -bottom-44 -right-44 h-[380px] w-[380px] rounded-full bg-[#4A7FA7]/45 blur-[130px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 overflow-hidden rounded-[26px] border border-[#B3CFE5]/20 bg-gradient-to-br from-[#0A1931] via-[#102A4B] to-[#1A3D63] p-6 shadow-2xl shadow-[#0A1931]/40"
        >
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
            Espace patient
          </p>

          <h1 className="flex items-center gap-3 text-2xl font-extrabold text-white lg:text-3xl">
            <History className="text-[#B3CFE5]" size={28} />
            Historique des consultations
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#F6FAFD]/75">
            Consultez l’historique de vos rendez-vous et consultations
            médicales.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-[26px] border border-[#B3CFE5]/20 bg-[#0F2745]/80 p-8 shadow-xl shadow-[#0A1931]/25 backdrop-blur-xl"
        >
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#B3CFE5]/25 bg-[#0A1931]/45 p-12 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5]">
              <CalendarDays size={32} />
            </div>

            <h2 className="text-xl font-extrabold text-white">
              Aucun historique disponible
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-[#B3CFE5]">
              Vos consultations apparaîtront ici une fois qu’elles seront
              enregistrées.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}