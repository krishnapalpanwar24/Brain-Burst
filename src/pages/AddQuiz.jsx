import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function AddQuiz() {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!category || !question || options.includes("") || !correctAnswer) {
      return alert("Fill all fields");
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "quizzes"), {
        category: category.trim().toUpperCase(),
        question,
        options,
        correctAnswer,
        createdAt: new Date(),
      });
      alert("✅ Quiz Added!");
      setCategory("");
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
    } catch {
      alert("Error adding quiz");
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-white mb-6">➕ Add New Quiz</h3>
      <form
        onSubmit={submit}
        className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col gap-4"
      >
        <input
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
          placeholder="Category (e.g. HTML, CSS, JS, React)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, i) => (
          <input
            key={i}
            className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
        ))}
        <select
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option value="">✅ Select Correct Answer</option>
          {options.map((opt, i) => (
            <option key={i} value={opt}>
              {opt || `Option ${i + 1}`}
            </option>
          ))}
        </select>
        <button
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition"
        >
          {loading ? "Adding..." : "Add Quiz ➕"}
        </button>
      </form>
    </div>
  );
}