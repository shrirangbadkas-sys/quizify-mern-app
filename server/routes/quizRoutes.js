const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const auth = require("../middleware/auth");

// ✅ CREATE QUIZ (PROTECTED)
router.post("/", auth, async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.json(quiz);
  } catch (err) {
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