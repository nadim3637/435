export default async function handler(req: any, res: any) {
  try {
    const { messages } = req.body;

    const keys = process.env.GROQ_KEYS?.split(",") || [];
    if (keys.length === 0) {
      return res.status(500).json({ error: "No Groq keys in env" });
    }

    // simple rotation
    const key = keys[Math.floor(Math.random() * keys.length)].trim();

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages
        })
      }
    );

    const data = await groqResponse.json();
    return res.status(groqResponse.status).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Groq server error" });
  }
}

