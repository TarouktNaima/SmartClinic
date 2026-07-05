import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Brain,
  Bone,
  Stethoscope,
  Syringe,
  Eye,
  User,
  Mail,
  ArrowRight
} from "lucide-react";
import api from "../../api/axios";

function Specialites() {
  const navigate = useNavigate();

  const [specialitesData, setSpecialitesData] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapping ديال أسماء الأيقونات
  const icons = {
    HeartPulse,
    Brain,
    Bone,
    Stethoscope,
    Syringe,
    Eye,
  };

  // 1. جلب التخصصات والأطباء معاً عند تحميل الصفحة
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [specResponse, docResponse] = await Promise.all([
          api.get("/specialites"),
          api.get("/doctors")
        ]);

        const specs = specResponse.data.data !== undefined ? specResponse.data.data : specResponse.data;
        const docs = docResponse.data.data !== undefined ? docResponse.data.data : docResponse.data;

        setSpecialitesData(Array.isArray(specs) ? specs : []);
        setAllDoctors(Array.isArray(docs) ? docs : []);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. تصفية الأطباء حسب التخصص المختار (تعديل الربط فقط لضمان جلب البيانات)
  const getFilteredDoctors = () => {
    if (!selectedSpecialite) return [];

    const selectedId = selectedSpecialite.id;
    const selectedName = String(selectedSpecialite.name || selectedSpecialite.nom || "").toLowerCase().trim();

    return allDoctors.filter((doc) => {
      // التحقق عبر الـ ID أولاً لأنه الأضمن
      const docSpecId = doc.specialite_id || doc.speciality_id || (doc.specialite && doc.specialite.id);
      if (docSpecId && Number(docSpecId) === Number(selectedId)) {
        return true;
      }

      // التحقق عبر الاسم كخيار احتياطي
      const docSpecName = String(
        typeof doc.specialite === "object" 
          ? (doc.specialite.name || doc.specialite.nom) 
          : doc.specialite || ""
      ).toLowerCase().trim();

      return docSpecName === selectedName;
    });
  };

  const filteredDoctors = getFilteredDoctors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-8 md:p-16 flex flex-col items-center">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-[#1a2a3a] mb-3 tracking-tight">
          SmartClinic Sectors & Médecins 🏥
        </h2>
        <p className="text-[#1a2a3a]/60 font-medium italic">
          Sélectionnez une spécialité pour afficher l'équipe médicale dédiée.
        </p>
        <div className="h-1.5 w-24 bg-[#1a2a3a] mx-auto rounded-full mt-4 opacity-20"></div>
      </motion.div>

      {loading ? (
        <div className="text-center py-10 text-[#1a2a3a] font-medium animate-pulse">
          Chargement des secteurs médicaux...
        </div>
      ) : (
        <div className="w-full max-w-6xl space-y-16">
          
          {/* Grille des Spécialités */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
            {specialitesData.map((item, index) => {
              const name = item.name || item.nom || "Spécialité";
              const desc = item.desc || item.description || "Aucune description disponible.";
              
              const Icon = icons[item.icon] || HeartPulse;
              const isSelected = selectedSpecialite?.id === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedSpecialite(item)}
                  className={`cursor-pointer relative p-10 rounded-[40px] backdrop-blur-xl border transition-all group overflow-hidden ${
                    isSelected 
                      ? "bg-[#1a2a3a] text-white border-[#1a2a3a] shadow-xl shadow-[#1a2a3a]/20" 
                      : "bg-white/30 border-white/40 shadow-2xl hover:shadow-blue-200/50"
                  }`}
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#82BCE0] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

                  <div className={`absolute top-6 left-6 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black shadow-lg ${
                    isSelected ? "bg-white text-[#1a2a3a]" : "bg-[#1a2a3a] text-[#82BCE0]"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex flex-col items-center text-center mt-6">
                    <div className={`mb-6 transition-all duration-500 ${
                      isSelected ? "text-[#82BCE0]" : "text-[#1a2a3a] group-hover:text-[#6FAED6] group-hover:scale-110"
                    }`}>
                      <Icon size={48} strokeWidth={1.2} />
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 ${isSelected ? "text-white" : "text-[#1a2a3a]"}`}>
                      {name}
                    </h3>

                    <p className={`text-sm mb-6 line-clamp-2 ${isSelected ? "text-gray-300" : "text-[#1a2a3a]/60"}`}>
                      {desc}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        navigate(`/doctors/${name}`);
                      }}
                      className={`text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all pb-1 flex items-center gap-2 ${
                        isSelected 
                          ? "text-[#82BCE0] border-[#82BCE0]" 
                          : "text-[#1a2a3a] border-[#1a2a3a]/10 group-hover:border-[#6FAED6] group-hover:text-[#6FAED6]"
                      }`}
                    >
                      Voir Page <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Section Dynamique : Liste des Médecins */}
          <AnimatePresence mode="wait">
            {selectedSpecialite && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/60 backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/60 shadow-xl"
              >
                <div className="border-b border-gray-200 pb-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1a2a3a]">
                      Membres Médicaux : {selectedSpecialite.name || selectedSpecialite.nom}
                    </h3>
                    <p className="text-sm text-[#1a2a3a]/60 mt-1">
                      {filteredDoctors.length} médecin(s) disponible(s) dans ce secteur.
                    </p>
                  </div>
                </div>

                {filteredDoctors.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 font-medium border border-dashed border-gray-300 rounded-3xl bg-white/40">
                    Aucun médecin n'est actuellement enregistré dans ce secteur.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doc) => (
                      <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#6FAED6] flex items-center justify-center font-bold">
                            <User size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">Dr. {doc.name}</h4>
                            <p className="text-xs text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-md inline-block mt-1">
                              {selectedSpecialite.name || selectedSpecialite.nom}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-50 space-y-2 text-sm text-gray-600 font-medium">
                          <div className="flex items-center gap-2 truncate">
                            <Mail size={16} className="text-gray-400" />
                            <span className="truncate">{doc.email || "contact@smartclinic.com"}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => navigate("/reserver-rdv", { state: { doctorId: doc.id } })}
                          className="w-full bg-[#6FAED6] hover:bg-[#5FA3CF] text-white text-xs font-bold py-3 rounded-xl transition-all mt-6 shadow-sm"
                        >
                          Réserver un Rendez-vous
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}

      {/* Background Decor */}
      <div className="fixed bottom-[-100px] right-[-100px] w-80 h-80 bg-[#82BCE0] rounded-full blur-[120px] opacity-20 -z-10"></div>
      <div className="fixed top-[20%] left-[-100px] w-64 h-64 bg-[#1a2a3a] rounded-full blur-[100px] opacity-10 -z-10"></div>

    </div>
  );
}

export default Specialites;