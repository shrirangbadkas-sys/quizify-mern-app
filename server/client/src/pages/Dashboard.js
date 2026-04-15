import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [results, setResults] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/result/${userId}`)
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  const totalQuizzes = results.length;
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);

  const avgScore = totalQuizzes
    ? (totalScore / totalQuizzes).toFixed(1)
    : 0;

  const percentage = totalQuestions
    ? ((totalScore / totalQuestions) * 100).toFixed(0)
    : 0;

  const bestScore = results.length
    ? Math.max(...results.map((r) => r.score))
    : 0;

  // 🎯 LEVEL SYSTEM
  const getLevel = () => {
    if (percentage >= 80) return "🔥 Pro";
    if (percentage >= 50) return "⚡ Intermediate";
    return "🌱 Beginner";
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📊 Quizify Dashboard</h2>

      {/* 🔥 STATS */}
      <div style={styles.stats}>

        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Total Quizzes</h3>
          <p>{totalQuizzes}</p>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Total Score</h3>
          <p>{totalScore}</p>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>Average Score</h3>
          <p>{avgScore}</p>
        </div>

        {/* 🏆 BEST SCORE */}
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>🏆 Best Score</h3>
          <p>{bestScore}</p>
        </div>

        {/* 🔥 STREAK */}
        <div
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3>🔥 Streak</h3>
          <p>{results.length} Plays</p>
        </div>

      </div>

      {/* 🎯 PERFORMANCE */}
      <div style={styles.performance}>
        <h3>🎯 Performance</h3>

        <div style={styles.progressBox}>
          <div
            style={{
              ...styles.progressBar,
              width: `${percentage}%`,
            }}
          ></div>
        </div>

        <p>{percentage}% Accuracy</p>
        <p style={styles.level}>{getLevel()}</p>
      </div>

      {/* 📜 HISTORY */}
      <h3 style={{ marginTop: "30px" }}>📜 Quiz Activity</h3>

      {results.length === 0 && (
        <p style={{ color: "#ccc" }}>
          🚀 Start your first quiz to see stats!
        </p>
      )}

      <div style={styles.timeline}>
        {results.map((r) => (
          <div key={r._id} style={styles.timelineCard}>
            <div style={styles.dot}></div>

            <div>
              <h4>{r.quizId?.title}</h4>
              <p>
                Score: {r.score}/{r.total}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    color: "white",
    textAlign: "center",
  },

  title: {
    marginBottom: "30px",
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    width: "180px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    transition: "0.3s",
    cursor: "pointer",
  },

  performance: {
    marginTop: "30px",
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    maxWidth: "500px",
    marginInline: "auto",
  },

  progressBox: {
    width: "100%",
    height: "10px",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "10px",
    margin: "10px 0",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    borderRadius: "10px",
  },

  level: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#cdb4ff",
  },

  timeline: {
    maxWidth: "500px",
    margin: "20px auto",
  },

  timelineCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "rgba(255,255,255,0.08)",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#9b5de5",
  },
};

export default Dashboard;