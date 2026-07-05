import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { motion } from "framer-motion";
import { ArrowLeft, User, CalendarCheck } from "lucide-react";

function DoctorsBySpecialite() {
  const { specialite } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        const filtered = res.data.filter(doc => doc.specialite === specialite);
        setDoctors(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Erreur API:", err);
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [specialite]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-8 md:p-16 relative overflow-hidden">
      
      {/* Decorative Blur Circles */}
      <div className="fixed top-[-100px] left-[-100px] w-96 h-96 bg-white opacity-20 blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-50px] right-[-50px] w-80 h-80 bg-[#1a2a3a] opacity-5 blur-[100px] -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <motion.button 
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-4 text-[#1a2a3a] font-black mb-12"
        >
          <div className="p-3 bg-white/40 backdrop-blur-md rounded-2xl shadow-sm group-hover:bg-[#1a2a3a] group-hover:text-white transition-all duration-300 border border-white/50">
            <ArrowLeft size={20} />
          </div>
          <span className="tracking-widest uppercase text-[12px]">Retour</span>
        </motion.button>

        <header className="mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-5xl font-black text-[#1a2a3a] tracking-tighter">
              Spécialistes <br />
              <span className="text-white drop-shadow-sm opacity-90">{specialite}</span>
            </h2>
            <div className="h-2 w-24 bg-[#1a2a3a] mt-6 rounded-full opacity-20"></div>
          </motion.div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
             <div className="w-12 h-12 border-4 border-[#1a2a3a]/10 border-t-[#1a2a3a] rounded-full animate-spin"></div>
             <p className="text-[#1a2a3a]/40 font-bold tracking-widest text-xs uppercase">Chargement des experts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {doctors.length > 0 ? (
              doctors.map((doc, idx) => (
                <motion.div
                  key={doc.id || doc._id} // t-akad wach 3ndk id wlla _id fl-base de données
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="bg-white/30 backdrop-blur-xl p-10 rounded-[45px] border border-white/40 shadow-2xl hover:shadow-blue-200/50 transition-all flex flex-col items-center text-center group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-30 transition-opacity"></div>

                  <div className="w-24 h-24 bg-[#1a2a3a] rounded-[30px] flex items-center justify-center text-[#82BCE0] mb-8 shadow-2xl shadow-[#1a2a3a]/30 group-hover:scale-110 transition-transform duration-500">
                    <User size={45} strokeWidth={1.5} />
                  </div>

                  <h4 className="font-black text-[#1a2a3a] text-2xl mb-2 tracking-tight group-hover:text-[#3b82f6] transition-colors">
                    Dr. {doc.name}
                  </h4>
                  
                  <div className="px-4 py-1.5 bg-[#1a2a3a]/5 rounded-full mb-8">
                    <p className="text-[#1a2a3a]/60 font-black text-[10px] uppercase tracking-[0.2em]">
                      {doc.specialite}
                    </p>
                  </div>
                  
                  {/* --- l-T3dil hna f l-button --- */}
                  
<motion.button 
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/reserver-rdv", { state: { doctor: doc } })} // n-sifto l-medecin f l-state
  className="w-full py-5 bg-[#1a2a3a] text-white rounded-[25px] font-bold hover:bg-[#2c4a63] transition-all shadow-xl shadow-[#1a2a3a]/20 flex items-center justify-center gap-3 group"
>
  <CalendarCheck size={18} className="group-hover:rotate-12 transition-transform" />
  <span>Prendre Rendez-vous</span>
</motion.button>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 bg-white/20 backdrop-blur-sm rounded-[50px] border-2 border-dashed border-[#1a2a3a]/10 text-center"
              >
                <div className="bg-white/40 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#1a2a3a]/30">
                   <User size={40} />
                </div>
                <p className="text-[#1a2a3a]/40 font-black text-xl tracking-tight px-6">
                  Aucun médecin trouvé pour cette spécialité.
                </p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DoctorsBySpecialite;