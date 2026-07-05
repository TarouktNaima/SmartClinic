import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, color, trend }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-xl"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-slate-300 text-sm">{title}</p>
          <h3 className="text-4xl font-bold text-white mt-2">{value}</h3>
          <p className="text-emerald-300 text-sm mt-3">{trend}</p>
        </div>

        <div className={`p-4 rounded-2xl shadow-lg ${color}`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </motion.div>
  );
}