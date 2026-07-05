import React, { useState } from 'react';

function ConsultationForm({ patients, onSubmit }) {
  const [formData, setFormData] = useState({ patient_id: '', diagnostic: '', prescription: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, () => {
     
      setFormData({ patient_id: '', diagnostic: '', prescription: '' });
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 h-fit">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Nouvelle Consultation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Sélectionner un Patient</label>
          <select name="patient_id" value={formData.patient_id} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="">-- Choisir un patient --</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name} {patient.prenom} (ID: {patient.id})
              </option>
            ))}
          </select>
        </div>

        {/* Diagnostic */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Diagnostic</label>
          <textarea name="diagnostic" value={formData.diagnostic} onChange={handleChange} required rows="3" placeholder="Description des symptômes et diagnostic..." className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        {/* Prescription (Ordonnance) */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Prescription (Médicaments)</label>
          <textarea name="prescription" value={formData.prescription} onChange={handleChange} rows="3" placeholder="Liste des médicaments et doses..." className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors cursor-pointer">
          Enregistrer la Consultation
        </button>
      </form>
    </div>
  );
}

export default ConsultationForm;