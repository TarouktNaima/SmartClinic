import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HeartPulse, Brain, Bone, Stethoscope, Syringe } from "lucide-react";

function DoctorsList() {
  const navigate = useNavigate();

  const specialitesData = [
    { 
      name: "Orthopédiste", 
      icon: <Bone size={52} strokeWidth={1.2} />, 
      id: "01", 
      desc: "Orthopedic Care Sector" 
    },
    { 
      name: "Dentiste", 
      icon: <Stethoscope size={52} strokeWidth={1.2} />, 
      id: "02", 
      desc: "Dentistry Department" 
    },
    { 
      name: "Neurologue", 
      icon: <Brain size={52} strokeWidth={1.2} />, 
      id: "03", 
      desc: "Neurology Department" 
    },
    { 
      name: "Cardiologue", 
      icon: <HeartPulse size={52} strokeWidth={1.2} />, 
      id: "04", 
      desc: "Cardiology Sector" 
    },
    { 
      name: "généraliste", 
      icon: <Syringe size={52} strokeWidth={1.2} />, 
      id: "05", 
      desc: "General Medicine" 
    },
  ];

  return (
    // Nfs l-background dial l-Login
    <div className="min-h-screen bg-gradient-to-br from-[#82BCE0] via-[#CAE3F0] to-[#F3F9FC] p-8 md:p-16 flex flex-col items-center">
      
      {/* Header mtnasq */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-[#1a2a3a] mb-3 tracking-tight">SmartClinic Sectors</h2>
        <p className="text-[#1a2a3a]/60 font-medium italic">Votre santé, notre priorité digitale.</p>
        <div className="h-1.5 w-24 bg-[#1a2a3a] mx-auto rounded-full mt-4 opacity-20"></div>
      </motion.div>
      
      {/* Grid dial les cards style "Glass" */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {specialitesData.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            onClick={() => navigate(`/doctors/${item.name}`)}
            // Style dial l-card m-copier mn l-Login (white/30 backdrop-blur)
            className="cursor-pointer relative p-12 rounded-[45px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl hover:shadow-blue-200/50 transition-all group overflow-hidden"
          >
            {/* Design element - circle blur sghir l-dakhel */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#82BCE0] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>

            {/* Number Badge style pro */}
            <div className="absolute top-8 left-8 w-9 h-9 rounded-full bg-[#1a2a3a] flex items-center justify-center text-[#82BCE0] text-[11px] font-black shadow-lg shadow-[#1a2a3a]/20">
              {item.id}
            </div>

            <div className="flex flex-col items-center text-center mt-6">
              {/* Icon Section - Outline nqi */}
              <div className="mb-8 text-[#1a2a3a] group-hover:text-[#6FAED6] group-hover:scale-110 transition-all duration-500 ease-out">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-[#1a2a3a] mb-4 tracking-tight">
                {item.desc}
              </h3>
              
              <p className="text-[#1a2a3a]/50 text-sm leading-relaxed mb-10 font-medium">
                Des soins spécialisés avec les dernières technologies pour votre bien-être.
              </p>
              
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1a2a3a] border-b-2 border-[#1a2a3a]/10 group-hover:border-[#6FAED6] group-hover:text-[#6FAED6] transition-all pb-1"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Blur circles bhal l-Login */}
      <div className="fixed bottom-[-100px] right-[-100px] w-80 h-80 bg-[#82BCE0] rounded-full blur-[120px] opacity-20 -z-10"></div>
      <div className="fixed top-[20%] left-[-100px] w-64 h-64 bg-[#1a2a3a] rounded-full blur-[100px] opacity-10 -z-10"></div>
    </div>
  );
}

export default DoctorsList;