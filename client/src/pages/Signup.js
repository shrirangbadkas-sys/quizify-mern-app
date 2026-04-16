import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Signup successful 🎉 Please login");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* 🔮 BACKGROUND EFFECTS */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>

      {/* 💎 CARD */}
      <div style={styles.card}>

        <h2 style={styles.title}>🚀 Create Account</h2>
        <p style={styles.subtitle}>🚀 Join Quizify</p>

        {/* 👤 NAME */}
        <input
          type="text"
          placeholder="👤 Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          onFocus={(e) => e.target.style.border = "1px solid #9b5de5"}
          onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.2)"}
        />

        {/* 📧 EMAIL */}
        <input
          type="email"
          placeholder="📧 Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          onFocus={(e) => e.target.style.border = "1px solid #9b5de5"}
          onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.2)"}
        />

        {/* 🔒 PASSWORD */}
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="🔒 Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            onFocus={(e) => e.target.style.border = "1px solid #9b5de5"}
            onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.2)"}
          />

          <span onClick={() => setShowPass(!showPass)} style={styles.eye}>
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {/* 🚀 BUTTON */}
        <button onClick={registerUser} style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Sign Up 🎉"}
        </button>

        {/* 🔗 LOGIN LINK */}
        <p style={{ marginTop: "12px", color: "#ccc" }}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1a0033, #3a0ca3)",
    position: "relative",
    overflow: "hidden",
  },

  bgCircle1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(155,93,229,0.4)",
    borderRadius: "50%",
    top: "-100px",
    left: "-100px",
    filter: "blur(120px)",
  },

  bgCircle2: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "rgba(90,24,154,0.4)",
    borderRadius: "50%",
    bottom: "-100px",
    right: "-100px",
    filter: "blur(120px)",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    textAlign: "center",
    color: "white",
    zIndex: 2,
  },

  title: {
    marginBottom: "10px",
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#ccc",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    background: "rgba(255,255,255,0.1)",
    color: "white",
  },

  eye: {
    position: "absolute",
    right: "10px",
    top: "10px",
    cursor: "pointer",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  link: {
    color: "#9b5de5",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Signup;