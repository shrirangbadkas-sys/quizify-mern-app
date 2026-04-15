import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userName = localStorage.getItem("userName");
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : "";

  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.sidebar}>

      {/* 🔥 LOGO */}
      <div style={styles.logo} onClick={() => navigate("/quizzes")}>
        ⚡ Quizify
      </div>

      {/* 👤 USER */}
      <div style={styles.userBox}>
        <div style={styles.avatar}>{firstLetter}</div>
        <span>{userName}</span>
      </div>

      {/* NAV LINKS */}
      <div style={styles.menu}>

        <div
          style={isActive("/quizzes") ? styles.active : styles.item}
          onClick={() => navigate("/quizzes")}
        >
          🏠 Home
        </div>

        <div
          style={isActive("/leaderboard") ? styles.active : styles.item}
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </div>

        <div
          style={isActive("/dashboard") ? styles.active : styles.item}
          onClick={() => navigate("/dashboard")}
        >
          📊 Dashboard
        </div>

      </div>

      {/* LOGOUT */}
      <button
        style={styles.logout}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>

    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    background: "linear-gradient(180deg, #1a0033, #240046)",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  userBox: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  menu: {
    marginTop: "30px",
    flex: 1,
  },

  item: {
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.05)",
  },

  active: {
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
  },

  logout: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    background: "#ff4d6d",
    color: "white",
    cursor: "pointer",
  },
};

export default Sidebar;