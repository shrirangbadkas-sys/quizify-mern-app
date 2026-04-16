import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalScore: 0,
    avgScore: 0,
    bestScore: 0,
    streak: 0,
  });

  const [loading, setLoading] = useState(true);

  // ✅ GET USER FROM LOCALSTORAGE
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      console.log("❌ No userId found");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/result/stats/${userId}`)
      .then((res) => {
        console.log("✅ Dashboard Stats:", res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log("❌ Dashboard Error:", err);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const {
    totalQuizzes,
    totalScore,
    avgScore,
    bestScore,
    streak,
  } = stats;

  const percentage = avgScore ? (avgScore * 100) / 10 : 0;

  // 🎯 LEVEL SYSTEM
  const getLevel = () => {
    if (percentage >= 80) return "🔥 Pro";
    if (percentage >= 50) return "⚡ Intermediate";
    return "🌱 Beginner";
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📊 Quizify Dashboard</h2>

      {/* 🔥 STATS */}
      <div style={styles.stats}>

        <div style={styles.card}>
          <h3>Total Quizzes</h3>
          <p>{totalQuizzes}</p>
        </div>

        <div style={styles.card}>
          <h3>Total Score</h3>
          <p>{totalScore}</p>
        </div>

        <div style={styles.card}>
          <h3>Average Score</h3>
          <p>{avgScore}</p>
        </div>

        <div style={styles.card}>
          <h3>🏆 Best Score</h3>
          <p>{bestScore}</p>
        </div>

        <div style={styles.card}>
          <h3>🔥 Streak</h3>
          <p>{streak} Plays</p>
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

        <p>{percentage.toFixed(1)}% Accuracy</p>
        <p style={styles.level}>{getLevel()}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    color: "white",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0033, #3a0ca3)",
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
};

export default Dashboard;