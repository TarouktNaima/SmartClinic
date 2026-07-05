import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Building, ShieldCheck, Search } from "lucide-react";
import api from "../../api/axios";

function DispoSlots() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Horaires d'ouverture fixes de la clinique
  const cliniqueHoraires = [
    { jour: "Lundi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Mardi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Mercredi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Jeudi", heures: "08:00 - 19:00", statut: "Ouvert" },
    { jour: "Vendredi", heures: "08:00 - 18:00", statut: "Ouvert" },
    { jour: "Samedi", heures: "08:30 - 13:00", statut: "Urgence Uniquement" },
    { jour: "Dimanche", heures: "Fermé", statut: "Fermé" },
  ];

  // Plannings par défaut des médecins (Fallback si l'API ne fournit pas les jours)
  const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  // 2. Récupération des médecins depuis l'API au chargement
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data.data || res.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des médecins:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Filtrage des médecins pour la barre de recherche
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-6 md:p-12">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* EN-TÊTE DE LA PAGE */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-3xl font-bold text-[#1a2a3a] flex items-center gap-3">
            Horaires & Plannings de la Clinique 📅
          </h2>
          <p className="text-[#1a2a3a]/60 text-sm mt-1">
            Consultez les heures d'ouverture générales ainsi que la disponibilité hebdomadaire de nos praticiens.
          </p>
        </div>

        {/* SECTION 1 : HORAIRES GÉNÉRAUX DE LA CLINIQUE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-xl border border-white/50">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Building size={20} className="text-blue-500" /> Heures d'Ouverture
            </h3>
            <div className="space-y-3">
              {cliniqueHoraires.map((item) => (
                <div 
                  key={item.jour} 
                  className={`flex justify-between items-center p-3 rounded-xl border text-sm font-medium ${
                    item.statut === "Fermé" 
                      ? "bg-red-50/50 border-red-100 text-red-700" 
                      : item.statut === "Urgence Uniquement"
                      ? "bg-amber-50/50 border-amber-100 text-amber-700"
                      : "bg-white border-gray-100 text-gray-700"
                  }`}
                >
                  <span>{item.jour}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs opacity-80">{item.heures}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.statut === "Ouvert" ? "bg-green-100 text-green-800" : "bg-opacity-20"
                    }`}>
                      {item.statut}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2 : RECHERCHE ET PLANNINGS INDIVIDUELS DES MÉDECINS */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[30px] shadow-xl border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <User size={20} className="text-purple-500" /> Disponibilités des Médecins
              </h3>

              {/* Barre de recherche médecin */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Rechercher un médecin pour voir son planning..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
                />
              </div>

              {/* Grille de sélection rapide des médecins */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
                <button
                  onClick={() => setSelectedDoctor("")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                    selectedDoctor === ""
                      ? "bg-[#1a2a3a] text-white border-[#1a2a3a]"
                      : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                  }`}
                >
                  Vue d'ensemble
                </button>
                {filteredDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap ${
                      selectedDoctor === doc.id
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    Dr. {doc.name}
                  </button>
                ))}
              </div>

              {/* Affichage du planning sous forme de grille de présence */}
              <div className="space-y-4">
                {doctors
                  .filter((d) => selectedDoctor === "" || d.id === selectedDoctor)
                  .map((doc) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-800 text-base">Dr. {doc.name}</h4>
                          <p className="text-xs text-purple-600 font-semibold">{doc.specialite || "Médecine Générale"}</p>
                        </div>
                        <span className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-bold">
                          <ShieldCheck size={12} /> Actif
                        </span>
                      </div>

                      {/* Jours de présence */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
                        {joursSemaine.map((jour) => {
                          // Simulation de jours d'absence alternés (Ex: Samedi après-midi ou mercredi selon logique)
                          const estPresent = jour !== "Samedi" || doc.id % 2 === 0; 
                          
                          return (
                            <div
                              key={jour}
                              className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                                estPresent
                                  ? "bg-emerald-50/40 border-emerald-100 text-emerald-800"
                                  : "bg-gray-50 border-gray-200 text-gray-400"
                              }`}
                            >
                              <span className="text-xs font-bold">{jour}</span>
                              <span className="text-[10px] opacity-80 flex items-center gap-0.5">
                                <Clock size={10} /> {estPresent ? "09:00 - 17:00" : "Absent"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DispoSlots;