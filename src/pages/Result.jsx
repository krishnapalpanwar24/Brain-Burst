import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Result() {
  const { state } = useLocation();
  const nav = useNavigate();

  if (!state) { nav("/"); return null; }

  const { score, total, answers, user, category } = state;
  const pct = Math.round((score / total) * 100);

  useEffect(() => {
    const save = async () => {
      if (!user?.email) return;

      try {

        const q = query(
          collection(db, "leaderboard"),
          where("email", "==", user.email),
          where("category", "==", category)
        );
        const snap = await getDocs(q);
        const deletePromises = snap.docs.map((d) =>
          deleteDoc(doc(db, "leaderboard", d.id))
        );
        await Promise.all(deletePromises);


        await addDoc(collection(db, "leaderboard"), {
          name: user.name || user.email,
          email: user.email,
          score,
          total,
          category,
          percentage: pct,
          date: new Date(),
        });
      } catch (err) {
        console.log("Error saving:", err);
      }
    };
    save();
  }, []);

  const getPerformance = () => {
    if (pct === 100) return {
      msg: "Perfect Score!",
      sub: "Outstanding!",
      color: "text-green-400"
    };
    if (pct >= 80) return {
      msg: "Excellent!",
      sub: "Great job! Keep it up",
      color: "text-green-400"
    };
    if (pct >= 60) return {
      msg: "Good Job!",
      sub: "Above average performance",
      color: "text-blue-400"
    };
    if (pct >= 40) return {
      msg: "Average",
      sub: "You can do better!",
      color: "text-yellow-400"
    };
    return {
      msg: "Need Improvement",
      sub: "Don't give up! Try again",
      color: "text-red-400"
    };
  };

  const perf = getPerformance();

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center mb-6 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-1">
            Quiz Complete!
          </h2>
          <p className="text-slate-400 mb-2">
            {user?.name && `Hey, ${user.name}!`}
          </p>
          <p className={`text-xl font-bold mb-1 ${perf.color}`}>
            {perf.msg}
          </p>
          <p className="text-slate-400 text-sm mb-4">
            {perf.sub}
          </p>
          <div className="text-5xl font-extrabold text-indigo-400 mb-1">
            {score}/{total}
          </div>
          <p className="text-slate-400 text-lg mb-4">{pct}% Correct</p>

          <div className="w-full bg-slate-700 rounded-full h-3 mb-6">
            <div
              className={`h-3 rounded-full transition-all ${pct >= 80 ? "bg-green-500" :
                  pct >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`}
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => nav("/quiz")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition"
            >
               Try Again
            </button>
            <button
              onClick={() => nav("/leaderboard")}
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2.5 rounded-xl font-semibold transition"
            >
               Leaderboard
            </button>
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-4">📋 Answer Review</h3>
        <div className="flex flex-col gap-3">
          {answers.map((a, i) => (
            <div
              key={i}
              className={`bg-slate-800 border rounded-xl p-4 ${a.isCorrect ? "border-green-600" : "border-red-600"
                }`}
            >
              <p className="text-white font-medium mb-2">{i + 1}. {a.question}</p>
              <p className={`text-sm ${a.isCorrect ? "text-green-400" : "text-red-400"}`}>
                Your Answer: {a.selected}
              </p>
              {!a.isCorrect && (
                <p className="text-green-400 text-sm">Correct: {a.correct}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}