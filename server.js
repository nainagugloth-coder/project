require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

function chunkText(text, maxChars) {
    maxChars = maxChars || 3000;
    var sentences = text.split(". ");
    var chunks = [];
    var current = "";

    for (var i = 0; i < sentences.length; i++) {
        var sentence = sentences[i];
        if ((current + sentence).length > maxChars) {
            if (current) chunks.push(current.trim());
            current = sentence;
        } else {
            current += " " + sentence;
        }
    }
    if (current) chunks.push(current.trim());
    return chunks;
}

app.post("/processNotes", async function (req, res) {
    var notes = req.body.notes;
    var mode = req.body.mode || "flashcards";
    var difficulty = req.body.difficulty || "Medium";

    var chunks = chunkText(notes, 3000);
    var trimmedNotes = chunks.slice(0, 3).join("\n\n");

    var difficultyInstructions = {
        Easy: "Use very simple language, short sentences, and basic concepts. Suitable for beginners.",
        Medium: "Use standard language and cover key concepts clearly.",
        Hard: "Use technical language, include advanced concepts, and go into depth."
    };

    var diffDesc = difficultyInstructions[difficulty] || difficultyInstructions["Medium"];

    var flashcardPrompt = "Create 5 flashcards from these notes. Difficulty: " + difficulty + " - " + diffDesc + "\n\nFormat each flashcard exactly like this:\nFront: [question]\nBack: [answer]\n\nNotes:\n" + trimmedNotes;
    var summaryPrompt = "Summarize these notes. Difficulty: " + difficulty + " - " + diffDesc + "\n\nWrite a clear structured summary.\n\nNotes:\n" + trimmedNotes;
    var quizPrompt = "Create a 5-question multiple choice quiz. Difficulty: " + difficulty + " - " + diffDesc + "\n\nFormat:\n1. [Question]\na) [Option]\nb) [Option]\nc) [Option]\nd) [Option]\nAnswer: [Correct option]\n\nNotes:\n" + trimmedNotes;

    var prompt = mode === "flashcards" ? flashcardPrompt : mode === "summary" ? summaryPrompt : quizPrompt;

    try {
        var response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are an expert study assistant. Always follow the difficulty level instructions carefully." },
                    { role: "user", content: prompt }
                ],
                max_tokens: 1024
            },
            {
                headers: {
                    "Authorization": "Bearer " + process.env.GROQ_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});