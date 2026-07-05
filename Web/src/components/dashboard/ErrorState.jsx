import { AlertTriangle } from "lucide-react";

export default function ErrorState({ message }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <AlertTriangle className="mx-auto text-red-300 mb-4" size={42} />
        <h2 className="text-white text-xl font-bold mb-2">Error</h2>
        <p className="text-red-200">{message}</p>
      </div>
    </div>
  );
}