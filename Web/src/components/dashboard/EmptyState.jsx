import { Inbox } from "lucide-react";

export default function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <Inbox className="w-12 h-12 text-slate-500 mb-3" />
      <p className="text-slate-400">{text}</p>
    </div>
  );
}