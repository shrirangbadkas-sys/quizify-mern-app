const API = "https://quizify-mern-app-production.up.railway.app";

export default API;
import API from "../api";

axios.get(`${API}/api/quiz`);