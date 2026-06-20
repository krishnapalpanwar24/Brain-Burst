import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Leaderboard from "./pages/Leaderboard";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddQuiz from "./pages/AddQuiz";
import EditQuiz from "./pages/EditQuiz";
import AllQuizes from "./pages/AllQuizes";
import Error from "./pages/Error";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";

export default function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/admin-login";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        <Route
          path="/quiz"
          element={
            <ProtectedUserRoute>
              <Quiz />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedUserRoute>
              <Result />
            </ProtectedUserRoute>
          }
        />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        >
          <Route path="add-quiz" element={<AddQuiz />} />
          <Route path="all-quizes" element={<AllQuizes />} />
          <Route path="edit-quiz/:id" element={<EditQuiz />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}