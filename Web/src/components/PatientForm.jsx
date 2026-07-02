import React from 'react';

function PatientForm({ formData, setFormData, onSubmit, isEditing }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-100 h-fit">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">
        {isEditing ? 'Modifier le Patient' : 'Ajouter un Nouveau Patient'}
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Nom</label>
          <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Prénom</label>
          <input type="text" name="prenom" value={formData.prenom || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Âge</label>
          <input type="number" name="age" value={formData.age || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
          <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Téléphone</label>
          <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <button type="submit" className={`w-full text-white font-medium py-2 rounded-lg transition-colors cursor-pointer ${isEditing ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isEditing ? 'Enregistrer les modifications' : 'Enregistrer le Patient'}
        </button>
        {isEditing && (
          <button type="button" onClick={() => { setFormData({ name: '', prenom: '', age: '', email: '',  phone: '' }); }} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium py-2 rounded-lg transition-colors cursor-pointer mt-2">
            Annuler
          </button>
        )}
      </form>
    </div>
  );
}

export default PatientForm;