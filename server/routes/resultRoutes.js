const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");


// 🏆 LEADERBOARD (TOP USERS) → MUST BE FIRST
router.get("/leaderboard/top", async (req, res) => {
  try {
    const leaderboard = await Result.find()
      .sort({ score: -1 }) // ❌ removed limit
      .populate("userId", "name")
      .populate("quizId", "title");

    res.json(leaderboard);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🎯 SUBMIT QUIZ
router.post("/submit", async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

    if (!userId || !quizId || !answers) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    let score = 0;

    const details = quiz.questions.map((q, index) => {
      const userAnswer = answers[index] || null; // ✅ FIX
    
      const isCorrect = userAnswer && q.correctAnswer === userAnswer;
    
      if (isCorrect) score++;
    
      return {
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswer || "Not Answered",
        isCorrect
      };
    });

    await Result.create({
      userId,
      quizId,
      score,
      total: quiz.questions.length
    });

    res.json({
      score,
      total: quiz.questions.length,
      percentage: ((score / quiz.questions.length) * 100).toFixed(2),
      details
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📊 GET USER RESULTS
router.get("/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId })
      .populate("quizId", "title");

    res.json(results);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;