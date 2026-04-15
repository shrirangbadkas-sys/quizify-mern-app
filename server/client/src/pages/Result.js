import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return <h3 style={{ textAlign: "center" }}>No Result Found</h3>;
  }

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        {/* 🎉 SCORE CARD */}
        <div style={styles.scoreCard}>
          <h2>🎉 Quizify Result</h2>
          <h1>{data.score} / {data.total}</h1>
          <p>{data.percentage}%</p>
        </div>

        {/* 📊 DETAILS */}
        {data.details.map((q, i) => (
          <div key={i} style={styles.card}>

            <h5>{i + 1}. {q.question}</h5>

            <p>
              Your:{" "}
              <span style={{
                color: q.isCorrect ? "#00ffae" : "#ff4d6d",
                fontWeight: "bold"
              }}>
                {q.userAnswer}
              </span>
            </p>

            <p style={{ color: "#ccc" }}>
              Correct: {q.correctAnswer}
            </p>

          </div>
        ))}

        {/* 🔙 BUTTON */}
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/quizzes")}
            style={styles.button}
          >
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
    backdropFilter: "blur(12px)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    marginBottom: "30px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "20px",
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