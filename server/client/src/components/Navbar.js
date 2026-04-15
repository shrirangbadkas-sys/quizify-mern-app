import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("userName");

  const isActive = (path) => location.pathname === path;

  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  return (
    <div style={styles.wrapper}>
      <div style={styles.navbar}>
        
        {/* LOGO */}
        <div style={styles.logoBox} onClick={() => navigate("/quizzes")}>
          <img src={logo} alt="Quizify" style={styles.logoImg} />
          <span style={styles.logoText}>Quizify</span>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          {userName && (
            <div style={styles.userBox}>
              <div style={styles.avatar}>{firstLetter}</div>
              <span>{userName}</span>
            </div>
          )}

          <button
            style={isActive("/quizzes") ? styles.active : styles.btn}
            onClick={() => navigate("/quizzes")}
          >
            Home
          </button>

          <button
            style={isActive("/leaderboard") ? styles.active : styles.btn}
            onClick={() => navigate("/leaderboard")}
          >
            🏆 Leaderboard
          </button>

          <button
            style={isActive("/dashboard") ? styles.active : styles.btn}
            onClick={() => navigate("/dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            style={styles.logout}
            onClick={() => {
              localStorage.removeItem("userId");
              localStorage.removeItem("userName");
              navigate("/");
            }}
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}

const styles = {
  // 🔥 FLOAT WRAPPER
  wrapper: {
    position: "sticky",
    top: "15px",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
  },

  // 💎 GLASS NAVBAR
  navbar: {
    width: "95%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 25px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    color: "white",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },

  logoImg: {
    height: "40px",
    width: "auto",
    objectFit: "contain",
    mixBlendMode: "lighten",
  },

  logoText: {
    fontWeight: "bold",
    fontSize: "20px",
    background: "linear-gradient(90deg, #ffffff, #cdb4ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  right: {
    display: "flex",
    alignItems: "center",
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    marginRight: "15px",
    gap: "8px",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },

  btn: {
    margin: "0 6px",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },

  active: {
    margin: "0 6px",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    boxShadow: "0 0 10px rgba(155,93,229,0.6)",
    color: "white",
    cursor: "pointer",
  },

  logout: {
    marginLeft: "10px",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #ff4d6d, #c9184a)",
    color: "white",
    cursor: "pointer",
  },
};

export default Navbar;