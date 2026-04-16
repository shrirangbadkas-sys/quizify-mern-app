import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/quiz`);
        console.log("Quizzes:", res.data);

        if (Array.isArray(res.data)) {
          setQuizzes(res.data);
        } else if (res.data.quizzes) {
          setQuizzes(res.data.quizzes);
        } else {
          setQuizzes([]);
        }
      } catch (err) {
        console.log("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // ✅ SAFE FILTER
  const filtered = quizzes.filter((q) => {
    const title = q.title || q.name || "";
    return title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>📚 Available Quizzes</h2>
      <p style={styles.subheading}>
        Choose a quiz and start learning 🚀
      </p>

      <input
        type="text"
        placeholder="Search quiz..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.stats}>
        <div style={styles.statBox}>
          📚 Total: {quizzes.length}
        </div>
        <div style={styles.statBox}>
          🎯 Ready to Play
        </div>
      </div>

      {loading && <p style={{ color: "#ccc" }}>Loading quizzes...</p>}

      {!loading && filtered.length === 0 && (
        <p style={{ color: "#ccc" }}>No quizzes found 😢</p>
      )}

      <div style={styles.grid}>
        {filtered.map((quiz) => {
          const title = quiz.title || quiz.name || "Untitled Quiz";
          const questionCount = Array.isArray(quiz.questions)
            ? quiz.questions.length
            : 0;

          return (
            <div key={quiz._id} style={styles.card}>
              <span style={styles.badge}>
                {questionCount} Questions
              </span>

              <h4 style={styles.title}>
                📘 {title}
              </h4>

              <p style={styles.meta}>
                🧠 {questionCount} Questions • Test your knowledge
              </p>

              <button
                style={styles.button}
                onClick={() => navigate(`/quiz/${quiz._id}`)}
              >
                Start Quiz ▶
              </button>
            </div>
          );
        })}
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
  search: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    width: "300px",
    marginBottom: "25px",
  },
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
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "25px",
    flexWrap: "wrap",
  },
  card: {
    width: "260px",
    padding: "22px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
  },
  badge: {
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    marginBottom: "12px",
  },
  title: {
    marginBottom: "10px",
  },
  meta: {
    fontSize: "13px",
    color: "#ccc",
  },
  button: {
    marginTop: "18px",
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    color: "white",
  },
};

export default QuizList;