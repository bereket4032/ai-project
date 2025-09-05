// api/ai.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` // <-- your API key
      },
      body: JSON.stringify({
        model: 'openrouter-gpt4', // or whichever model you want
        messages: [{ role: 'user', content: message }]
      })
    });

    const data = await response.json();
    res.status(200).json({ result: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
