const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

// ✅ CREATE QUIZ
router.post("/", async (req, res) => {
  try {
    console.log("👉 BODY:", req.body); // ✅ ADD THIS

    const { title, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ msg: "Invalid quiz data" });
    }

    const quiz = new Quiz({
      title,
      questions,
    });

    await quiz.save();

    console.log("✅ SAVED:", quiz); // ✅ ADD THIS

    res.json(quiz);
  } catch (err) {
    console.log("❌ ERROR:", err); // ✅ ADD THIS
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL QUIZZES
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET SINGLE QUIZ
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;