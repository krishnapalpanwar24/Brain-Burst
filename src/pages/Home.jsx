import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-6xl">⚡</div>
      <h1 className="text-5xl font-extrabold text-white mb-4">
        Welcome to <span className="text-indigo-400">BrainBurst</span>
      </h1>
      <p className="text-slate-400 text-lg mb-10 max-w-md">
        Test your knowledge across HTML, CSS, JavaScript & React. Compete on the leaderboard!
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <NavLink to="/quiz"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl transition text-lg shadow-lg"
        >
           Start Quiz
        </NavLink>
        <NavLink to="/leaderboard"
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-xl transition text-lg shadow-lg"
        >
           Leaderboard
        </NavLink>
        <NavLink to="/register"
          className="border border-indigo-500 text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold px-8 py-3 rounded-xl transition text-lg"
        >
           Register
        </NavLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-3xl w-full">
        {[
          { icon: "⏱️", title: "15 Sec Timer", desc: "Each question has a 15 second countdown" },
          { icon: "📊", title: "Score Tracking", desc: "See your score and performance after quiz" },
          { icon: "🏆", title: "Leaderboard", desc: "Compete with others and top the board" },
        ].map((f) => (
          <div key={f.title} className="bg-slate-800 border border-slate-700 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="text-white font-semibold mb-1">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}