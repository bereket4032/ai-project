//import { supabase } from '../lib/supabase.js';

export default async function handler(req, res) {
  const userInput = req.query.prompt || "Hello AI!";

  // Call OpenRouter AI
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }]
    })
  });

  const data = await response.json();
  const aiReply = data.choices?.[0]?.message?.content || "No response";

  // Save to Supabase
  await supabase.from("conversations").insert([
    { user_input: userInput, ai_response: aiReply }
  ]);

  res.status(200).json({ userInput, aiReply });
}
