import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/result/leaderboard/top")
      .then((res) => {
        console.log("Leaderboard:", res.data); // 🔍 DEBUG
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🏆 Leaderboard</h2>

        {/* 🔄 LOADING */}
        {loading && (
          <p style={{ textAlign: "center", color: "#ccc" }}>
            Loading leaderboard...
          </p>
        )}

        {/* ❌ EMPTY */}
        {!loading && data.length === 0 && (
          <p style={{ textAlign: "center", color: "#ccc" }}>
            No results yet 😢
          </p>
        )}

        {/* ✅ DATA */}
        {!loading &&
          data.map((user, index) => {
            const name = user.userId?.name || "Unknown";
            const quiz = user.quizId?.title || "Quiz";
            const score = user.score ?? 0;

            return (
              <div
                key={user._id || index}
                style={{
                  ...styles.card,
                  ...(index === 0 && styles.gold),
                  ...(index === 1 && styles.silver),
                  ...(index === 2 && styles.bronze),
                }}
              >
                <div style={styles.row}>
                  {/* 👤 AVATAR */}
                  <div style={styles.avatar}>
                    {name.charAt(0).toUpperCase()}
                  </div>

                  {/* 🧾 INFO */}
                  <div style={styles.info}>
                    <h4 style={styles.name}>
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : `#${index + 1}`}{" "}
                      {name}
                    </h4>

                    <p style={styles.text}>📚 {quiz}</p>

                    <p style={styles.score}>
                      🎯 Score: {score}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0033, #3a0ca3)",
    padding: "40px",
    color: "white",
  },

  container: {
    maxWidth: "800px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },

  gold: {
    border: "2px solid gold",
    background: "rgba(255,215,0,0.15)",
  },

  silver: {
    border: "2px solid silver",
    background: "rgba(192,192,192,0.15)",
  },

  bronze: {
    border: "2px solid #cd7f32",
    background: "rgba(205,127,50,0.15)",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #9b5de5, #5a189a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
    color: "white",
    boxShadow: "0 0 10px rgba(155,93,229,0.6)",
  },

  info: {
    textAlign: "left",
  },

  name: {
    marginBottom: "5px",
  },

  text: {
    fontSize: "14px",
    color: "#ccc",
  },

  score: {
    fontWeight: "bold",
    marginTop: "5px",
  },
};

export default Leaderboard;