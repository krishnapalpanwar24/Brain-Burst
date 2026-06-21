import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("ALL");
  const [categories, setCategories] = useState(["ALL"]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "leaderboard"),
        orderBy("score", "desc")
      );
      const snap = await getDocs(q);
      const result = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setData(result);

      
      const cats = ["ALL", ...new Set(result
        .map((d) => d.category)
        .filter((c) => c !== "ALL")
      )];
      setCategories(cats);
      setLoading(false);
    };
    fetchData();
  }, []);

  
  const filtered = selectedCat === "ALL"
    ? data
    : data.filter((d) => d.category === selectedCat);

  const medals = ["🥇", "🥈", "🥉"];

  const catBadgeColors = {
    REACT: "bg-blue-900/40 border-blue-500 text-blue-300",
    JS: "bg-yellow-900/40 border-yellow-500 text-yellow-300",
    HTML: "bg-orange-900/40 border-orange-500 text-orange-300",
    CSS: "bg-pink-900/40 border-pink-500 text-pink-300",
    ALL: "bg-indigo-900/40 border-indigo-500 text-indigo-300",
    MIXED: "bg-slate-700 border-slate-500 text-slate-300",
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          🏆 Leaderboard
        </h2>
        <p className="text-center text-slate-400 mb-6">
          Top Quiz Champions
        </p>

       
<div className="relative max-w-xs mx-auto mb-8">
  <select
    value={selectedCat}
    onChange={(e) => setSelectedCat(e.target.value)}
    className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-5 py-3 text-sm font-semibold focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
  >
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat === "ALL" ? "All Categories" :
         cat === "REACT" ? "React" :
         cat === "JS" ? "JavaScript" :
         cat === "HTML" ? "HTML" :
         cat === "CSS" ? "CSS" : cat}
      </option>
    ))}
  </select>
 
  <div className="text-3xl absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
    ▾
  </div>
</div>

       
        <p className="text-slate-500 text-sm text-center mb-4">
          Showing{" "}
          <span className="text-white font-bold">{filtered.length}</span>{" "}
          entries
          {selectedCat !== "ALL" && (
            <span className="text-indigo-400"> for {selectedCat}</span>
          )}
        </p>

        
        {loading ? (
          <p className="text-center text-slate-400">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-5xl mb-3">😔</div>
            <p className="text-slate-500">
              No entries yet for {selectedCat}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((entry, i) => (
              <div
                key={entry.id}
                className={`flex items-center justify-between bg-slate-800 border rounded-xl px-5 py-4 ${
                  
                  selectedCat !== "ALL" && i === 0 ? "border-yellow-500" :
                  selectedCat !== "ALL" && i === 1 ? "border-slate-400" :
                  selectedCat !== "ALL" && i === 2 ? "border-orange-500" :
                  "border-slate-700"  
                }`}
              >
                <div className="flex items-center gap-4">

                  
                  <span className="text-2xl min-w-9 text-center">
                    {selectedCat !== "ALL"
                      ? medals[i] || `#${i + 1}`  
                      : `#${i + 1}`              
                    }
                  </span>

                  
                  <div>
                    <p className="text-white font-semibold">{entry.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        catBadgeColors[entry.category] || "bg-slate-700 border-slate-500 text-slate-300"
                      }`}>
                        {entry.category}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {entry.percentage}%
                      </span>
                    </div>
                  </div>
                </div>

                
                <div className="text-right">
                  <div className="text-indigo-400 font-bold text-lg">
                    {entry.score}/{entry.total}
                  </div>
                  <div className="text-slate-500 text-xs">score</div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}