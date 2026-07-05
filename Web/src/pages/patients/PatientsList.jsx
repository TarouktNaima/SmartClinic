import React from "react";
import { FileText, Pencil, Trash2, UsersRound } from "lucide-react";

function PatientsList({ patients, loading, onEdit, onDelete, onSelectPatient }) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3CFE5]">
            Dossiers patients
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-white">
            Patients enregistrés
          </h2>
        </div>

        <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#B3CFE5]/20 bg-[#102A4B] text-[#B3CFE5] sm:flex">
          <UsersRound size={24} />
        </div>
      </div>

      {loading ? (
        <p className="rounded-2xl border border-[#B3CFE5]/20 bg-[#0A1931]/45 p-6 text-center text-sm font-bold text-[#B3CFE5]">
          Chargement des données...
        </p>
      ) : patients.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[#B3CFE5]/25 bg-[#0A1931]/45 p-8 text-center text-sm font-bold text-[#B3CFE5]">
          Aucun patient enregistré pour le moment.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#B3CFE5]/15 bg-[#0A1931]/55">
                <th className="p-4 text-xs font-bold uppercase tracking-[0.14em] text-[#B3CFE5]">
                  ID
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-[0.14em] text-[#B3CFE5]">
                  Nom & Prénom
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-[0.14em] text-[#B3CFE5]">
                  Âge
                </th>
                <th className="p-4 text-xs font-bold uppercase tracking-[0.14em] text-[#B3CFE5]">
                  Téléphone
                </th>
                <th className="p-4 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#B3CFE5]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-[#B3CFE5]/10 transition hover:bg-[#1A3D63]/35"
                >
                  <td className="p-4 text-sm font-semibold text-[#B3CFE5]">
                    #{patient.id}
                  </td>

                  <td className="p-4 font-bold text-white">
                    {patient.name} {patient.prenom}
                  </td>

                  <td className="p-4 text-sm text-[#B3CFE5]">
                    {patient.age} ans
                  </td>

                  <td className="p-4 text-sm text-[#B3CFE5]">
                    {patient.phone}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() => onSelectPatient(patient)}
                        className="flex items-center gap-1 rounded-xl border border-[#B3CFE5]/20 bg-[#1A3D63]/70 px-3 py-2 text-xs font-bold text-[#B3CFE5] transition hover:bg-[#4A7FA7] hover:text-white"
                      >
                        <FileText size={14} />
                        Dossier
                      </button>

                      <button
                        onClick={() => onEdit(patient)}
                        className="flex items-center gap-1 rounded-xl border border-[#B3CFE5]/20 bg-[#102A4B] px-3 py-2 text-xs font-bold text-[#B3CFE5] transition hover:bg-[#1A3D63] hover:text-white"
                      >
                        <Pencil size={14} />
                        Modifier
                      </button>

                      <button
                        onClick={() => onDelete(patient.id)}
                        className="flex items-center gap-1 rounded-xl border border-red-400/15 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20"
                      >
                        <Trash2 size={14} />
                        Supprimer
                      </button>
                    </div>
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