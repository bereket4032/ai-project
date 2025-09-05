import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const userMessage = req.body.message;

      const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

      if (!OPENROUTER_API_KEY) {
        return res.status(500).json({ message: 'Server misconfigured: Missing API key' });
      }

      const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openassistant/airoboros-llama2-7b",
          messages: [{ role: "user", content: userMessage }]
        }),
      });

      const data = await response.json();

      // Send only the AI text content
      res.status(200).json({ message: data.choices[0].message.content });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error generating AI response' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
