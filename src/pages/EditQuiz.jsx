import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function EditQuiz() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({
    category: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      const snap = await getDoc(doc(db, "quizzes", id));
      if (snap.exists()) setForm(snap.data());
      setLoading(false);
    };
    fetchQuiz();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "quizzes", id), form);
    alert("✅ Quiz Updated!");
    nav("/dashboard/all-quizes");
  };

  if (loading) return <p className="text-slate-400">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h3 className="text-xl font-bold text-white mb-6">✏️ Edit Quiz</h3>
      <form
        onSubmit={submit}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4"
      >
        <input
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          placeholder="Category"
        />
        <input
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          placeholder="Question"
        />
        {form.options.map((opt, i) => (
          <input
            key={i}
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            value={opt}
            placeholder={`Option ${i + 1}`}
            onChange={(e) => {
              const copy = [...form.options];
              copy[i] = e.target.value;
              setForm({ ...form, options: copy });
            }}
          />
        ))}
        <select
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5"
          value={form.correctAnswer}
          onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
        >
          <option value="">Select Correct Answer</option>
          {form.options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt || `Option ${i + 1}`}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition">
            ✅ Update Quiz
          </button>
          <button
            type="button"
            onClick={() => nav(-1)}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}