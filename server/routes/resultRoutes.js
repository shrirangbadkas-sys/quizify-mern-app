const express = require("express");
const router = express.Router();

const Quiz = require("../models/Quiz");
const Result = require("../models/Result");


// 🟢 1. DASHBOARD STATS (PUT FIRST)
router.get("/stats/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });

    if (results.length === 0) {
      return res.json({
        totalQuizzes: 0,
        totalScore: 0,
        avgScore: 0,
        bestScore: 0,
        streak: 0
      });
    }

    const totalQuizzes = results.length;

    const totalScore = results.reduce((sum, r) => sum + r.score, 0);

    const avgScore = (totalScore / totalQuizzes).toFixed(2);

    const bestScore = Math.max(...results.map(r => r.score));

    res.json({
      totalQuizzes,
      totalScore,
      avgScore,
      bestScore,
      streak: totalQuizzes
    });

  } catch (err) {
    console.log("Dashboard Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🏆 2. LEADERBOARD
router.get("/leaderboard/top", async (req, res) => {
  try {
    const leaderboard = await Result.aggregate([
      { $sort: { score: -1 } },
      {
        $group: {
          _id: "$userId",
          score: { $first: "$score" },
          quizId: { $first: "$quizId" }
        }
      },
      { $sort: { score: -1 } },
      { $limit: 10 }
    ]);

    const populated = await Result.populate(leaderboard, [
      { path: "_id", select: "name", model: "User" },
      { path: "quizId", select: "title", model: "Quiz" }
    ]);

    const formatted = populated.map(item => ({
      _id: item._id._id,
      userId: item._id,
      quizId: item.quizId,
      score: item.score
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🎯 3. SUBMIT QUIZ
router.post("/submit", async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);

    let score = 0;

    const details = quiz.questions.map((q, index) => {
      const userAnswer = answers[index] ?? null;
      const isCorrect = userAnswer === q.correctAnswer;
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


// 🔴 4. GET USER RESULTS (ALWAYS LAST)
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