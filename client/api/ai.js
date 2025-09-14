// api/ai.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("🔥 Received request body:", req.body);

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const headers = {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    };

    console.log("Sending request to OpenRouter with key prefix:", process.env.OPENROUTER_API_KEY?.slice(0, 8));

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", data);

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    res.status(200).json({ result: data.choices[0].message.content });

  } catch (error) {
    console.error("❌ Server crash:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
