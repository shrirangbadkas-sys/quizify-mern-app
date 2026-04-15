import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import QuizList from "./pages/QuizList";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import { useState } from "react";
import Splash from "./components/Splash";


function App() {
  const location = useLocation();

  return (
    <>
      {/* Hide navbar on login page */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />

      </Routes>
    </>
  );
}

function AppWrapper() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      <App />
    </Router>
  );
}


export default AppWrapper;