const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const chatBox = document.getElementById("chat-box");

function appendMessage(content, sender) {
  const msg = document.createElement("div");
  msg.textContent = content;
  msg.classList.add("message", sender);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, "user");
  input.value = "";
  appendMessage("Thinking...", "ai");

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatBox.lastChild.textContent = data.result || "No response";
  } catch (err) {
    chatBox.lastChild.textContent = "Error: " + err.message;
  }
});

// Send on Enter (without shift)
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});
