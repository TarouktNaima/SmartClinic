import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardChart({ patients, doctors, rendezvous }) {
  const barData = [
    { name: "Patients", total: patients },
    { name: "Doctors", total: doctors },
    { name: "Rendezvous", total: rendezvous },
  ];

  const pieData = [
    { name: "Patients", value: patients },
    { name: "Doctors", value: doctors },
    { name: "Rendezvous", value: rendezvous },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
        <h3 className="text-white font-bold mb-6">Statistics Overview</h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <Tooltip />
            <Bar dataKey="total" radius={[12, 12, 0, 0]} fill="#818cf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6">
        <h3 className="text-white font-bold mb-6">Clinic Distribution</h3>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={90}
              label
            >
              <Cell fill="#818cf8" />
              <Cell fill="#22c55e" />
              <Cell fill="#f97316" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}