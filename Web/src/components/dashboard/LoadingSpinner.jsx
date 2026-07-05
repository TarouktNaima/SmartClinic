import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
    </div>
  );
}