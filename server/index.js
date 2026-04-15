const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/quiz", require("./routes/quizRoutes"));
app.use("/api/result", require("./routes/resultRoutes"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/quizDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");


});