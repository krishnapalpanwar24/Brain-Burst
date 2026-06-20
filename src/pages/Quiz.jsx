import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const TIMER = 15;

export default function Quiz() {
  const nav = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [filtered, setFiltered] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER);
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDocs(collection(db, "quizzes"));
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setQuizzes(data);
      setCategories(["ALL", ...new Set(data.map((q) => q.category))]);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (selected !== null) return;
    if (timer === 0) { handleNext(true); return; }
    const t = setInterval(() => setTimer((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer, started, selected]);

  const startQuiz = () => {
    const list = selectedCat === "ALL"
      ? quizzes
      : quizzes.filter((q) => q.category === selectedCat);
    if (list.length === 0) return alert("No quizzes in this category!");
    setFiltered(list);
    setStarted(true);
    setTimer(TIMER);
  };

  const handleAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    const correct = filtered[current].correctAnswer;
    if (opt === correct) setScore((s) => s + 1);
    setAnswers((prev) => [
      ...prev,
      {
        question: filtered[current].question,
        selected: opt,
        correct,
        isCorrect: opt === correct,
      },
    ]);
  };

  const handleNext = (timeout = false) => {
    if (timeout && selected === null) {
      setAnswers((prev) => [
        ...prev,
        {
          question: filtered[current].question,
          selected: "⏱ Timeout",
          correct: filtered[current].correctAnswer,
          isCorrect: false,
        },
      ]);
    }
    if (current + 1 >= filtered.length) {
      nav("/result", {
        state: {
          score,
          total: filtered.length,
          answers,
          user,
          category: selectedCat  
        },
      });
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setTimer(TIMER);
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-slate-400 text-lg">Loading quizzes...</p>
    </div>
  );

  if (!started) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">🎯 Select Category</h2>
        <p className="text-slate-400 mb-6">Choose a topic to start quiz</p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition border ${selectedCat === cat
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-slate-600 text-slate-300 hover:border-indigo-500 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={startQuiz}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-xl w-full transition"
        >
          🚀 Start Quiz
        </button>
      </div>
    </div>
  );

  const q = filtered[current];
  const timerPct = (timer / TIMER) * 100;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-2xl shadow-2xl">


        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-400 text-sm">
            Question <span className="text-white font-bold">{current + 1}</span> / {filtered.length}
          </span>
          <span className={`font-bold text-lg ${timer <= 5 ? "text-red-400" : "text-indigo-400"}`}>
            ⏱ {timer}s
          </span>
        </div>


        <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
          <div
            className={`h-2 rounded-full transition-all duration-1000 ${timer <= 5 ? "bg-red-500" : "bg-indigo-500"}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>


        <h3 className="text-white text-xl font-semibold mb-6 min-h-15">
          {q.question}
        </h3>


        <div className="grid grid-cols-1 gap-3 mb-6">
          {q.options.map((opt, i) => {
            let style = "border-slate-600 text-slate-200 hover:border-indigo-500 hover:bg-slate-700";
            if (selected !== null) {
              if (opt === q.correctAnswer) style = "border-green-500 bg-green-900/40 text-green-300";
              else if (opt === selected) style = "border-red-500 bg-red-900/40 text-red-300";
              else style = "border-slate-700 text-slate-500";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className={`text-left px-5 py-3 rounded-xl border transition font-medium ${style}`}
              >
                <span className="mr-3 text-slate-500">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            );
          })}
        </div>


        <div className="min-h-13">
          {selected !== null ? (
            <button
              onClick={() => handleNext()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
            >
              {current + 1 >= filtered.length ? "See Results 🎉" : "Next Question →"}
            </button>
          ) : (
            <div className="w-full py-3 rounded-xl bg-transparent" />
          )}
        </div>


        <p className="text-center text-slate-500 text-sm mt-4">
          Score: <span className="text-indigo-400 font-bold">{score}</span>
        </p>

      </div>
    </div>
  );

}