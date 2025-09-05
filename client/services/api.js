// services/api.js
export async function sendMessageToAI(message) {
  try {
    const res = await fetch('https://your-app.vercel.app/chat', { // Replace with your backend URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      throw new Error('AI request failed');
    }

    const data = await res.json();
    return data; // your backend should return { reply: "AI response" }
  } catch (error) {
    console.error('Error connecting to AI:', error);
    return { reply: 'Error connecting to AI' };
  }
}
