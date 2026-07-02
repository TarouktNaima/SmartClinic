import { Bell, Search } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Header({ user }) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-white">{greeting}</h2>
        <p className="text-slate-400 mt-1">
          Welcome back, {user?.name || "User"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 w-72">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder:text-slate-400 w-full"
          />
        </div>

        <button className="relative rounded-2xl border border-white/10 bg-white/10 p-3 text-white hover:bg-white/20">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <ProfileDropdown user={user} />
      </div>
    </header>
  );
}