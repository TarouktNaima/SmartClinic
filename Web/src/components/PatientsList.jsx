import React from 'react';

function PatientsList({ patients, loading, onEdit, onDelete }) {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Liste des Patients Enregistrés</h2>
      
      {loading ? (
        <p className="text-slate-500 text-center py-4">Chargement des données...</p>
      ) : patients.length === 0 ? (
        <p className="text-slate-400 text-center py-4">Aucun patient enregistré pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-3 text-slate-600 font-semibold text-sm">ID</th>
                <th className="p-3 text-slate-600 font-semibold text-sm">Nom & Prénom</th>
                <th className="p-3 text-slate-600 font-semibold text-sm">Âge</th>
                <th className="p-3 text-slate-600 font-semibold text-sm">Email</th>
                <th className="p-3 text-slate-600 font-semibold text-sm">Téléphone</th>
                <th className="p-3 text-slate-600 font-semibold text-sm text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 text-slate-500 text-sm">{patient.id}</td>
                  <td className="p-3 font-medium text-slate-700">{patient.name} {patient.prenom}</td>
                  <td className="p-3 text-slate-600 text-sm">{patient.age} ans</td>
                  <td className="p-3 text-slate-600 text-sm">{patient.email}</td>
                  <td className="p-3 text-slate-600 text-sm">{patient.phone}</td>
                  <td className="p-3 space-x-2 text-center">
                    <button onClick={() => onEdit(patient)} className="bg-amber-100 text-amber-700 hover:bg-amber-200 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer">
                      Modifier
                    </button>
                    <button onClick={() => onDelete(patient.id)} className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PatientsList;