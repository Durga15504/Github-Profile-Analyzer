const express = require("express");

const router = express.Router();

const githubController = require("../controllers/githubController");

router.get("/", (req, res) => {
    res.send("GitHub Profile Analyzer API");
});

router.post("/analyze/:username", githubController.analyzeUser);

router.get("/profiles", githubController.getAllProfiles);

router.get("/profiles/:username", githubController.getProfile);

module.exports = router;