import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.hero}>
        <h1>⚡ Quizify</h1>
        <p>Test your knowledge. Improve your brain.</p>

        <button onClick={() => navigate("/")} style={styles.btn}>
          Get Started 🚀
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #1a0033, #3a0ca3)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hero: {
    textAlign: "center",
  },
  btn: {
    marginTop: "20px",
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    color: "white",
    cursor: "pointer",
  },
};

export default Landing;