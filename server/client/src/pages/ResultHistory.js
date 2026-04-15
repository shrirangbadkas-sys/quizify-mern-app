import { useEffect, useState } from "react";
import axios from "axios";

function ResultHistory() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/result/${localStorage.getItem("userId")}`)
      .then(res => setResults(res.data));
  }, []);

  return (
    <div>
      <h2>📊 My Results</h2>

      {results.map((r, i) => (
        <div key={i}>
          <p>Quiz: {r.quizId?.title}</p>
          <p>Score: {r.score}/{r.total}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ResultHistory;