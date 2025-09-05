import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// AI endpoint
app.post("/api/ai", async (req, res) => {
  const { message } = req.body;

  try {
    // Here you call your AI service (OpenAI, OpenRouter, etc.)
    const reply = `Echo: ${message}`; // placeholder for AI response
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
