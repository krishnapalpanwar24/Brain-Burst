import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <div className="text-8xl mb-4">😵</div>
      <h1 className="text-6xl font-extrabold text-red-500 mb-2">404</h1>
      <p className="text-slate-400 text-lg mb-6">Page not found</p>
      <NavLink
        to="/"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
      >
         Go Home
      </NavLink>
    </div>
  );
}