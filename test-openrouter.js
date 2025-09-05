import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testOpenRouter() {
  try {
    const response = await axios.post(
      "https://api.openrouter.ai/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Hello AI, can you respond?" }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        },
      }
    );
    console.log("Success! Response from OpenRouter:");
    console.log(response.data);
  } catch (err) {
    console.error("Error connecting to OpenRouter:", err.message);
  }
}

testOpenRouter();
