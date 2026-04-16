import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔄 Fetch quizzes
  useEffect(() => {
    axios
      .get("https://quizify-mern-app-production.up.railway.app/api/quiz")
      .then((res) => setQuizzes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🔍 Filter quizzes
  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <h2 style={styles.heading}>📚 Available Quizzes</h2>
      <p style={styles.subheading}>
        Choose a quiz and start learning 🚀
      </p>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search quiz..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* 📊 STATS */}
      <div style={styles.stats}>
        <div style={styles.statBox}>
          📚 Total: {quizzes.length}
        </div>
        <div style={styles.statBox}>
          🎯 Ready to Play
        </div>
      </div>

      {/* ❌ EMPTY STATE */}
      {filtered.length === 0 && (
        <p style={{ color: "#ccc" }}>No quizzes found 😢</p>
      )}

      {/* 🎴 QUIZ CARDS */}
      <div style={styles.grid}>
        {filtered.map((quiz) => (
          <div
            key={quiz._id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-8px) scale(1.04)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            {/* 🏷️ BADGE */}
            <span style={styles.badge}>
              {quiz.questions?.length || 0} Questions
            </span>

            {/* 📘 TITLE */}
            <h4 style={styles.title}>
              📘 {quiz.title}
            </h4>

            {/* 🧠 META */}
            <p style={styles.meta}>
              🧠 {quiz.questions?.length || 0} Questions • Test your knowledge
            </p>

            {/* 🚀 BUTTON */}
            <button
              style={styles.button}
              onClick={() => navigate(`/quiz/${quiz._id}`)}
            >
              Start Quiz ▶
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    textAlign: "center",
    color: "white",
  },

  heading: {
    marginBottom: "5px",
    fontSize: "28px",
  },

  subheading: {
    color: "#ccc",
    marginBottom: "20px",
  },

  // 🔍 SEARCH
  search: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    width: "300px",
    marginBottom: "25px",
    outline: "none",
  },

  // 📊 STATS
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  statBox: {
    padding: "12px 20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  // 🎴 GRID
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },

  // 🎴 CARD
  card: {
    width: "260px",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer",
  },

  // 🏷️ BADGE
  badge: {
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    display: "inline-block",
    marginBottom: "12px",
  },

  title: {
    marginBottom: "10px",
  },

  // 🧠 META
  meta: {
    fontSize: "13px",
    color: "#ccc",
  },

  // 🚀 BUTTON
  button: {
    marginTop: "18px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default QuizList;