require("dotenv").config(); // ✅ load env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS (important for frontend)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/result", require("./routes/resultRoutes"));

// ✅ MongoDB Atlas connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "quizify"
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Railway dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});