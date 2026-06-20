import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Register() {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) return alert("Please fill all fields");
        if (password.length < 6) return alert("Password min 6 characters");

        setLoading(true);
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const users = snapshot.docs.map((d) => d.data());
            if (users.find((u) => u.email === email)) {
                alert("Email already registered");
                setLoading(false);
                return;
            }
            await addDoc(collection(db, "users"), { name, email, password });

            localStorage.removeItem("userloggedIn");
            localStorage.removeItem("loggedInUser");

            alert("Registered successfully!");
            nav("/login");
        } catch (err) {
            console.log("Error:", err.message);
            alert(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    📝 Create Account
                </h2>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <input
                        className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500"
                        placeholder="Password (min 6 chars)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        disabled={loading}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                <p className="text-center text-slate-400 text-sm mt-4">
                    Already have account?{" "}
                    <NavLink to="/login" className="text-indigo-400 hover:underline">Login</NavLink>
                </p>
            </div>
        </div>
    );
}