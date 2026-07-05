import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Trash2, Layers, HelpCircle } from "lucide-react";
import api from "../../api/axios";

function AddSpecialite() {
  // 1. States ديال الـ Form والبيانات
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [specialites, setSpecialites] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // 2. جلب التخصصات ملي كتحل الصفحة
  const fetchSpecialites = async () => {
    try {
      const response = await api.get("/specialites");
      setSpecialites(response.data);
    } catch (err) {
      console.error("Erreur fetching specialites:", err);
    }
  };

  useEffect(() => {
    fetchSpecialites();
  }, []);

  // 3. دالة إضافة تخصص جديد
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const response = await api.post("/specialites", {
        name,
        desc,
        icon,
      });

      setMessage({ type: "success", text: response.data.message || "Spécialité ajoutée ! ✅" });
      setName("");
      setDesc("");
      setIcon("");
      fetchSpecialites(); // تحديث الجدول تلقائياً
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Erreur lors de l'ajout ❌",
      });
    }
  };

  // 4. دالة حذف تخصص
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette spécialité ? ⚠️")) {
      try {
        const response = await api.delete(`/specialites/${id}`);
        setMessage({ type: "success", text: response.data.message || "Supprimée avec succès ✅" });
        fetchSpecialites(); // تحديث الجدول تلقائياً
      } catch (err) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Erreur lors de la suppression ❌",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="w-full max-w-6xl z-10">
        {/* Header أنيق */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-[#1a2a3a] tracking-tight flex items-center justify-center gap-3">
            <Layers className="text-[#6FAED6]" /> Gestion des Spécialités
          </h2>
          <p className="text-[#1a2a3a]/60 text-sm font-medium mt-1">Espace Admin : Ajouter ou supprimer les secteurs de la clinique.</p>
        </motion.div>

        {/* تقسيم الشاشة لـ جزأين */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* 👈 الجزء الأول: الفورم ديال الإضافة (بياخد 2 خانات من الـ Grid) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white/30 backdrop-blur-xl p-8 rounded-[35px] border border-white/40 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-[#1a2a3a] mb-6 flex items-center gap-2">
              <PlusCircle size={20} className="text-blue-600" /> Nouvelle Spécialité
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#1a2a3a]/70 uppercase tracking-wider mb-2">Nom de la Spécialité</label>
                <input
                  type="text"
                  placeholder="Ex: Cardiologue, Dentiste..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white/80 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-300 text-[#1a2a3a] font-semibold transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2a3a]/70 uppercase tracking-wider mb-2">Description du Secteur</label>
                <input
                  type="text"
                  placeholder="Ex: Cardiology Sector"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white/80 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-300 text-[#1a2a3a] font-semibold transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1a2a3a]/70 uppercase tracking-wider mb-2">Nom de l'icône Lucide</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white/80 border border-white/50 focus:outline-none focus:ring-2 focus:ring-blue-300 text-[#1a2a3a] font-semibold bg-white cursor-pointer transition"
                  required
                >
                  <option value="">-- Choisir une icône --</option>
                  <option value="HeartPulse">HeartPulse (Cardio)</option>
                  <option value="Brain">Brain (Neuro)</option>
                  <option value="Bone">Bone (Ortho)</option>
                  <option value="Stethoscope">Stethoscope (Dentiste)</option>
                  <option value="Syringe">Syringe (Généraliste)</option>
                  <option value="Eye">Eye (Ophtalmo)</option>
                </select>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-[#1a2a3a] hover:bg-[#1a2a3a]/90 text-white py-4 rounded-2xl font-bold tracking-wide shadow-lg transition-all text-sm uppercase"
              >
                Ajouter au système
              </motion.button>
            </form>

            {/* رسائل التنبيه الفورية داخل الـ Form */}
            {message.text && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 p-3 rounded-xl text-center text-xs font-bold ${
                  message.type === "success" ? "bg-green-100/80 text-green-800" : "bg-red-100/80 text-red-800"
                }`}
              >
                {message.text}
              </motion.div>
            )}
          </motion.div>

          {/* 👉 الجزء الثاني: جدول الحذف والعرض (بياخد 3 خانات من الـ Grid) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white/30 backdrop-blur-xl p-8 rounded-[35px] border border-white/40 shadow-2xl overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#1a2a3a] mb-6">
              Secteurs Enregistrés ({specialites.length})
            </h3>

            {specialites.length === 0 ? (
              <p className="text-center text-[#1a2a3a]/50 py-12 font-medium italic bg-white/40 rounded-2xl">
                Aucune spécialité enregistrée pour le moment.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/40 bg-white/60 shadow-sm max-h-[400px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1a2a3a] text-[#82BCE0] text-xs uppercase tracking-wider">
                      <th className="p-4 font-black">Spécialité</th>
                      <th className="p-4 font-black">Description</th>
                      <th className="p-4 font-black">Icône</th>
                      <th className="p-4 font-black text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#1a2a3a] divide-y divide-white/40 text-sm font-medium">
                    <AnimatePresence>
                      {specialites.map((spec) => (
                        <motion.tr 
                          key={spec.id} 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: 50 }}
                          className="hover:bg-white/40 transition duration-150"
                        >
                          <td className="p-4 font-bold text-gray-900">{spec.name}</td>
                          <td className="p-4 text-xs text-gray-600">{spec.desc}</td>
                          <td className="p-4 font-mono text-xs text-blue-600 font-semibold">{spec.icon}</td>
                          <td className="p-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(spec.id)}
                              className="p-2.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition shadow-sm inline-flex items-center justify-center"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>

        </div>
      </div>

      {/* الخلفية المموّهة (Blur Circles) لتطابق الهوية البصرية للسيستم */}
      <div className="fixed bottom-[-100px] right-[-100px] w-80 h-80 bg-[#82BCE0] rounded-full blur-[120px] opacity-20 -z-10"></div>
      <div className="fixed top-[20%] left-[-100px] w-64 h-64 bg-[#1a2a3a] rounded-full blur-[100px] opacity-10 -z-10"></div>
    </div>
  );
}

export default AddSpecialite;