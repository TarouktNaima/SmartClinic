import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="border-b border-slate-200 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">SmartClinic Dashboard</h1>
        <p className="text-slate-500">Gestion des patients, des consultations et des documents médicaux</p>
      </div>
      
      <div className="flex bg-slate-200/70 p-1 rounded-xl w-fit">
        <NavLink 
          to="/" 
          className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Patients
        </NavLink>
        <NavLink 
          to="/consultations" 
          className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Consultations & Historique
        </NavLink>
        <NavLink 
          to="/documents" 
          className={({ isActive }) => `px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-800'}`}
        >
          Documents & Files
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;