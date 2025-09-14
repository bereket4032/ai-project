// client/pages/chat.js
import { useState, useRef, useEffect } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [chatLog]);

  const sendMessageToAI = async () => {
    const text = message.trim();
    if (!text) return;

    setChatLog(prev => [...prev, { role: 'user', content: text }]);
    setMessage('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      // ALWAYS log status + raw body for debugging
      const data = await res.json().catch(() => null);
      console.log('/api/ai status', res.status, 'body:', data);

      // The API returns { message: "..." }
      const aiText = data?.message ?? (data?.details ? `Error: ${JSON.stringify(data.details)}` : 'No response');
      setChatLog(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (err) {
      console.error('Network error calling /api/ai:', err);
      setChatLog(prev => [...prev, { role: 'ai', content: `Network error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => { if (e.key === 'Enter') sendMessageToAI(); };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 My AI Assistant</h1>

      <div ref={boxRef} style={{ border: '1px solid #ddd', padding: 12, height: 380, overflowY: 'auto', marginBottom: 12, borderRadius: 6, background: '#fafafa' }}>
        {chatLog.map((m, i) => (
          <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '8px 0' }}>
            <b>{m.role === 'user' ? 'You' : 'AI'}: </b>
            <span>{m.content}</span>
          </div>
        ))}
        {loading && <div style={{ color: '#666' }}>AI is typing…</div>}
      </div>

      <div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={onKeyDown} placeholder="Type a message..." style={{ width: '78%', padding: '10px', borderRadius: 4, border: '1px solid #ccc' }} />
        <button onClick={sendMessageToAI} disabled={loading} style={{ padding: '10px 16px', marginLeft: 8 }}>{loading ? 'Sending…' : 'Send'}</button>
      </div>
    </div>
  );
}
