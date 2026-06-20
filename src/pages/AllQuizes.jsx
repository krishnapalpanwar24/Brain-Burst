import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function AllQuizes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("ALL");
  const nav = useNavigate();
  const location = useLocation();

 
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCat(location.state.category);
    }
  }, [location.state]);

  const fetchQuizzes = async () => {
    const snap = await getDocs(collection(db, "quizzes"));
    setQuizzes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  };

  useEffect(() => { fetchQuizzes(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;
    await deleteDoc(doc(db, "quizzes", id));
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
  };

  const categories = ["ALL", ...new Set(quizzes.map((q) => q.category))];
  const filtered = selectedCat === "ALL"
    ? quizzes
    : quizzes.filter((q) => q.category === selectedCat);

  if (loading) return <p className="text-slate-400">Loading...</p>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          📋 All Quizzes ({filtered.length})
        </h3>
        <select
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none"
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-slate-500">No quizzes found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((q, i) => (
            <div
              key={q.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-white font-semibold">
                  {i + 1}. {q.question}
                </h4>
                <span className="bg-indigo-600/20 text-indigo-400 text-xs px-2 py-1 rounded-full ml-2 whitespace-nowrap">
                  {q.category}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`text-sm px-3 py-1.5 rounded-lg border ${
                      opt === q.correctAnswer
                        ? "border-green-500 bg-green-900/30 text-green-300"
                        : "border-slate-600 text-slate-400"
                    }`}
                  >
                    {opt === q.correctAnswer && "✅ "}{opt}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => nav(`/dashboard/edit-quiz/${q.id}`)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}