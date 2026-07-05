import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Heart, 
  Eye, 
  Activity, 
  Baby, 
  Search, 
  User, 
  Mail, 
  CheckCircle,
  ChevronRight
} from "lucide-react";
import api from "../../api/axios";

function SectorsAndDoctors() {
  const [specialites, setSpecialites] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialite, setSelectedSpecialite] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Mappage d'icônes selon le nom de la spécialité pour un rendu professionnel
  const getIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("cardio")) return <Heart className="text-red-500" size={24} />;
    if (lowerName.includes("pédiatrie") || lowerName.includes("enfant")) return <Baby className="text-amber-500" size={24} />;
    if (lowerName.includes("ophtalmo")) return <Eye className="text-teal-500" size={24} />;
    if (lowerName.includes("générale")) return <Activity className="text-blue-500" size={24} />;
    return <Stethoscope className="text-purple-500" size={24} />;
  };

  // 1. Chargement des données (Spécialités et Médecins)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [specRes, docRes] = await Promise.all([
          api.get("/specialites"),
          api.get("/doctors")
        ]);
        
        setSpecialites(specRes.data.data || specRes.data || []);
        setDoctors(docRes.data.data || docRes.data || []);
      } catch (err) {
        console.error("Erreur de récupération des données:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. Logique de filtrage combinée (Recherche + Spécialité cliquée)
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialite = 
      selectedSpecialite === "Tous" || 
      doc.specialite?.toLowerCase() === selectedSpecialite.toLowerCase() ||
      doc.specialite_id === selectedSpecialite; // supporte ID ou Nom string

    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.specialite && doc.specialite.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSpecialite && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-6 md:p-12">
      <div className="w-full max-w-7xl mx-auto space-y-10">
        
        {/* EN-TÊTE DE LA PAGE */}
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-3xl font-bold text-[#1a2a3a] flex items-center gap-3">
            Secteurs Médicaux & Praticiens 🏥
          </h2>
          <p className="text-[#1a2a3a]/60 text-sm mt-1">
            Explorez les différentes spécialités de SmartClinic et découvrez notre équipe d'experts médicaux.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-600 font-medium animate-pulse">
            Chargement des spécialités et de l'équipe médicale...
          </div>
        ) : (
          <>
            {/* SECTION 1 : CARTES DES SPÉCIALITÉS (SECTEURS) */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                Nos Secteurs Disponibles
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Bouton "Tous" */}
                <div 
                  onClick={() => setSelectedSpecialite("Tous")}
                  className={`p-5 rounded-[24px] border cursor-pointer transition-all shadow-sm flex flex-col justify-between h-32 ${
                    selectedSpecialite === "Tous"
                      ? "bg-[#1a2a3a] text-white border-[#1a2a3a] scale-[1.02]"
                      : "bg-white/80 hover:bg-white text-gray-800 border-gray-100"
                  }`}
                >
                  <Activity size={24} className={selectedSpecialite === "Tous" ? "text-blue-300" : "text-gray-400"} />
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold text-sm">Tous les Secteurs</span>
                    <ChevronRight size={16} />
                  </div>
                </div>

                {/* Liste des Spécialités dynamiques */}
                {specialites.map((spec) => {
                  const isSelected = selectedSpecialite === spec.nom || selectedSpecialite === spec.id;
                  return (
                    <div 
                      key={spec.id}
                      onClick={() => setSelectedSpecialite(spec.nom)}
                      className={`p-5 rounded-[24px] border cursor-pointer transition-all shadow-sm flex flex-col justify-between h-32 ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 scale-[1.02]"
                          : "bg-white/80 hover:bg-white text-gray-800 border-gray-100"
                      }`}
                    >
                      <div>{getIcon(spec.nom)}</div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-sm tracking-wide line-clamp-1">{spec.nom}</span>
                        <ChevronRight size={16} className={isSelected ? "text-white" : "text-gray-400"} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BARRE DE RECHERCHE MÉDECIN */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher un médecin par son nom..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium"
              />
            </div>

            {/* SECTION 2 : GRILLE DE NOS MÉDECINS */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Membres du Corps Médical ({filteredDoctors.length})
              </h3>
              
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-12 bg-white/40 border border-dashed border-gray-300 rounded-3xl text-gray-500 font-medium">
                  Aucun médecin trouvé pour ce secteur ou avec ces critères de recherche.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDoctors.map((doc) => (
                    <motion.div
                      key={doc.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-[30px] p-6 border border-gray-100 shadow-xl relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Avatar temporaire & Infos de base */}
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#6FAED6] flex items-center justify-center font-bold shadow-inner">
                            <User size={28} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-lg">Dr. {doc.name}</h4>
                            <p className="text-xs bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full font-bold inline-block mt-0.5 border border-purple-100">
                              {doc.specialite || "Généraliste"}
                            </p>
                          </div>
                        </div>

                        {/* Coordonnées */}
                        <div className="pt-2 space-y-2 border-t border-gray-50 text-sm text-gray-600 font-medium">
                          <div className="flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <span className="truncate">{doc.email || "contact@smartclinic.com"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Badge Statut en Bas */}
                      <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">Cabinet de Consultation</span>
                        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                          <CheckCircle size={12} /> Disponible
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default SectorsAndDoctors;