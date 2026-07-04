export default function DoctorAppointments() {
  return <DoctorPage title="My Appointments" text="Here you will see your appointments." />;
}

function DoctorPage({ title, text }) {
  return (
    <div className="min-h-screen bg-[#07101f] text-white flex items-center justify-center">
      <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-10 backdrop-blur-xl">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-slate-400 mt-4">{text}</p>
      </div>
    </div>
  );
}