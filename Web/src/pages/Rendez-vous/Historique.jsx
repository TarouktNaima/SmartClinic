import { motion } from "framer-motion";
import { History } from "lucide-react";

export default function Historique() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#07101f] text-white p-8">

      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[150px]"
      />

      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] backdrop-blur-xl p-8">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-[22px] border border-indigo-400/20 bg-indigo-500/10">
              <History className="text-indigo-200" size={30} />
            </div>

            <div>
              <p className="uppercase tracking-[0.3em] text-indigo-300 text-sm">
                Patient Workspace
              </p>

              <h1 className="text-4xl font-bold">
                Historique des consultations
              </h1>
            </div>

          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">

            <p className="text-slate-400">
              Aucun historique disponible pour le moment.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}