import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({});
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(60);
  const navigate = useNavigate();

  const submitRef = useRef();

  // 📥 Fetch quiz
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quiz/${id}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  // ⏱️ Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Keep latest submit function
  useEffect(() => {
    submitRef.current = submitQuiz;
  });

  // Auto submit
  useEffect(() => {
    if (time === 0 && submitRef.current) {
      submitRef.current();
    }
  }, [time]);

  // Answer handler
  const handleAnswer = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  // Submit
  const submitQuiz = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/result/submit",
        {
          userId,
          quizId: id,
          answers,
        }
      );

      navigate("/result", { state: res.data });

    } catch (err) {
      console.log("ERROR:", err.response?.data);
      alert("Error submitting quiz");
    }
  };

  // Progress
  const progress =
    (answers.filter((a) => a).length / (quiz.questions?.length || 1)) * 100;

  return (
    <div style={styles.page}>

      <div style={styles.container}>

        {/* TITLE */}
        <h2 style={{ textAlign: "center" }}>{quiz.title}</h2>
        <p style={styles.subtitle}>Answer before time ends ⏳</p>

        {/* TIMER */}
        <h4 style={styles.timer}>⏱️ {time}s</h4>

        {/* PROGRESS */}
        <div style={styles.progress}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progress}%`,
            }}
          />
        </div>

        {/* QUESTIONS */}
        {quiz.questions?.map((q, i) => (
          <div key={i} style={styles.card}>

            <h5>{i + 1}. {q.question}</h5>

            <div style={{ marginTop: "10px" }}>
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(i, opt)}
                  style={{
                    ...styles.option,
                    background:
                      answers[i] === opt
                        ? "linear-gradient(90deg, #9b5de5, #5a189a)"
                        : "transparent",
                    color: answers[i] === opt ? "white" : "#ddd",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>

          </div>
        ))}

        {/* SUBMIT */}
        <div style={{ textAlign: "center" }}>
          <button onClick={submitQuiz} style={styles.submit}>
            Submit Quiz 🚀
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

  subtitle: {
    textAlign: "center",
    color: "#ccc",
  },

  timer: {
    textAlign: "center",
    color: "#ff4d6d",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
  },

  option: {
    margin: "5px",
    padding: "10px 15px",
    borderRadius: "10px",
    border: "1px solid #9b5de5",
    cursor: "pointer",
  },

  submit: {
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg, #9b5de5, #5a189a)",
    color: "white",
    cursor: "pointer",
  },

  progress: {
    height: "10px",
    background: "#333",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  progressBar: {
    height: "100%",
    background: "#9b5de5",
    borderRadius: "10px",
  },
};

export default Quiz;