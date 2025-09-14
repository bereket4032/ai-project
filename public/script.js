const input = document.getElementById("input");
const output = document.getElementById("output");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", async () => {
  const message = input.value.trim();
  if (!message) return;

  output.textContent = "Thinking...";

  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    output.textContent = data.result || JSON.stringify(data);
  } catch (err) {
    output.textContent = "Error: " + err.message;
  }
});
