import { Loader2, HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A1931]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="relative flex h-20 w-20 items-center justify-center">
          <Loader2 className="absolute h-20 w-20 animate-spin text-[#4A7FA7]" />

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#102A4B] text-[#B3CFE5]">
            <HeartPulse size={25} />
          </div>
        </div>

        <h2 className="mt-5 text-lg font-extrabold text-white">
          Smart<span className="text-[#4A7FA7]">Clinic</span>
        </h2>

        <p className="mt-1 text-sm text-[#B3CFE5]/60">
          Chargement...
        </p>
      </motion.div>
    </div>
  );
}