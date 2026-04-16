import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const score = data.score || 0;
  const total = data.total || 0;
  const percentage = data.percentage || 0;

  const details = Array.isArray(data.details) ? data.details : [];

  if (!location.state) {
    return (
      <div style={styles.page}>
        <h3 style={{ textAlign: "center", color: "white" }}>
          No Result Found 😢
        </h3>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={() => navigate("/quizzes")} style={styles.button}>
            Go to Quizzes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* 🎉 SCORE */}
        <div style={styles.scoreCard}>
          <h2>🎉 Quizify Result</h2>
          <h1>{score} / {total}</h1>
          <p>{percentage}%</p>
        </div>

        {/* 📋 DETAILS */}
        <h3>📋 Answer Review</h3>

        {details.length === 0 ? (
          <p style={{ textAlign: "center" }}>No details available</p>
        ) : (
          details.map((q, i) => (
            <div key={i} style={styles.card}>

              <h5>{i + 1}. {q.question}</h5>

              <p>
                Your Answer:{" "}
                <span style={{
                  color: q.isCorrect ? "#00ffae" : "#ff4d6d",
                  fontWeight: "bold"
                }}>
                  {q.userAnswer}
                </span>
              </p>

              <p style={{ color: "#ccc" }}>
                Correct Answer: {q.correctAnswer}
              </p>

              <p style={{
                color: q.isCorrect ? "#00ffae" : "#ff4d6d",
                fontWeight: "bold"
              }}>
                {q.isCorrect ? "✔ Correct" : "✘ Wrong"}
              </p>

            </div>
          ))
        )}

        <div style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/quizzes")} style={styles.button}>
            Back to Home
          </button>
        </div>

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
  scoreCard: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    marginBottom: "30px",
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "15px",
  },
  button: {
    marginTop: "20px",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    color: "white",
    cursor: "pointer",
  }
};

export default Result;