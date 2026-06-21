import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin-login");
  };

  return (
   <div className="w-60 h-screen sticky top-0 bg-slate-800 border-r border-slate-700 flex flex-col p-4">
      <h2 className="text-indigo-400 font-bold text-xl mb-8 text-center">
        ⚡ Admin Panel
      </h2>

       <button
        onClick={logout}
        className="mt-auto bg-red-600 hover:bg-red-700 text-white py-2 my-4 rounded-lg text-sm transition"
      >
        Logout
      </button>

      <nav className="flex flex-col gap-2 flex-1">
        {[
          { to: "/dashboard", label: "📊 Dashboard", end: true },
          { to: "/dashboard/add-quiz", label: "➕ Add Quiz" },
          { to: "/dashboard/all-quizes", label: "📋 All Quizzes" },
        ].map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

     
    </div>
  );
}