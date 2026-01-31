// api/groq.ts
export default async function handler(req: any, res: any) {
  const { key, messages } = req.body;

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`, // सर्वर साइड पर बैक-टिक्स सुरक्षित हैं
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: messages
      })
    });

    const data = await groqResponse.json();
    return res.status(groqResponse.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
}

