import { useState } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessageToAI = async () => {
    if (!message) return;

    setLoading(true);
    const userMessage = { role: 'user', content: message };
    setChatLog((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await res.json();

      const aiMessage = {
        role: 'ai',
        content: data.message || 'No response'
      };
      setChatLog((prev) => [...prev, aiMessage]);

    } catch (err) {
      setChatLog((prev) => [...prev, { role: 'ai', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessageToAI();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>AI Chat</h1>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          height: '400px',
          overflowY: 'auto',
          marginBottom: '10px'
        }}
      >
        {chatLog.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.role === 'user' ? 'right' : 'left',
              margin: '5px 0'
            }}
          >
            <strong>{msg.role === 'user' ? 'You' : 'AI'}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button
        onClick={sendMessageToAI}
        disabled={loading}
        style={{ padding: '10px 20px', marginLeft: '5px' }}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
