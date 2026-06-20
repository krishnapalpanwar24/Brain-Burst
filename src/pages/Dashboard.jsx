import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        quizzes: 0,
        users: 0,
        attempts: 0,
    });
    const [categoryStats, setCategoryStats] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            const [q, u, l] = await Promise.all([
                getDocs(collection(db, "quizzes")),
                getDocs(collection(db, "users")),
                getDocs(collection(db, "leaderboard")),
            ]);

            setStats({
                quizzes: q.size,
                users: u.size,
                attempts: l.size,
            });

            const quizData = q.docs.map((d) => d.data());
            const catMap = {};
            quizData.forEach((quiz) => {
                const cat = quiz.category || "OTHER";
                catMap[cat] = (catMap[cat] || 0) + 1;
            });

            const catArray = Object.entries(catMap).map(([name, count]) => ({
                name,
                count,
            }));
            setCategoryStats(catArray);
        };

        fetchStats();
    }, []);

    const isDashboardHome = location.pathname === "/dashboard";

    const catColors = {
        REACT: "bg-blue-900/40 border-blue-500 text-blue-300 hover:bg-blue-900/70",
        JS: "bg-yellow-900/40 border-yellow-500 text-yellow-300 hover:bg-yellow-900/70",
        HTML: "bg-orange-900/40 border-orange-500 text-orange-300 hover:bg-orange-900/70",
        CSS: "bg-pink-900/40 border-pink-500 text-pink-300 hover:bg-pink-900/70",
    };

    return (
        <div className="flex min-h-screen bg-slate-900">
            <AdminSidebar />
            <div className="flex-1 p-6 overflow-y-auto max-h-screen">

                {isDashboardHome && (
                    <>

                        <h3 className="text-xl font-bold text-white mb-6">
                            📊 Dashboard Overview
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


                            <div
                                onClick={() => navigate("/dashboard/all-quizes")}
                                className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-700 transition"
                            >
                                <div className="text-4xl mb-2">📋</div>
                                <div className="text-3xl font-bold text-white">{stats.quizzes}</div>
                                <div className="text-slate-400 text-sm mt-1">Total Quizzes</div>
                                <div className="text-indigo-400 text-xs mt-2">Click to view all →</div>
                            </div>


                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-2">👥</div>
                                <div className="text-3xl font-bold text-white">{stats.users}</div>
                                <div className="text-slate-400 text-sm mt-1">Total Users</div>
                            </div>


                            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-center">
                                <div className="text-4xl mb-2">🎯</div>
                                <div className="text-3xl font-bold text-white">{stats.attempts}</div>
                                <div className="text-slate-400 text-sm mt-1">Quiz Attempts</div>
                            </div>

                        </div>


                        <h3 className="text-xl font-bold text-white mb-4">
                            📂 Category Wise Quizzes
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {categoryStats.length === 0 ? (
                                <p className="text-slate-500 col-span-4">
                                    No quizzes added yet!
                                </p>
                            ) : (
                                categoryStats.map((cat) => (
                                    <div
                                        key={cat.name}
                                        onClick={() =>
                                            navigate("/dashboard/all-quizes", {
                                                state: { category: cat.name },
                                            })
                                        }
                                        className={`border rounded-xl p-5 text-center cursor-pointer transition ${catColors[cat.name] ||
                                            "bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
                                            }`}
                                    >
                                        <div className="text-3xl font-bold mb-1">{cat.count}</div>
                                        <div className="text-sm font-medium">{cat.name}</div>
                                        <div className="text-xs mt-1 opacity-70">Quizzes</div>
                                        <div className="text-xs mt-2 opacity-60">Click to view →</div>
                                    </div>
                                ))
                            )}
                        </div>

                    </>
                )}

                <Outlet />
            </div>
        </div>
    );
}