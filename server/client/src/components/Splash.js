import { useEffect } from "react";

function Splash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]); // ✅ FIXED

  return (
    <div style={styles.page}>
      <h1 style={styles.logo}>⚡ Quizify</h1>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #1a0033, #3a0ca3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  logo: {
    fontSize: "40px",
  },
};

export default Splash;