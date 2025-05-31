require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const admin = require("firebase-admin");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// Firebase Admin SDK 초기화 (firebase-adminsdk.json 필요)
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project-id.firebaseio.com" // 🔁 수정 필요
});
const db = admin.database();

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "너는 친절한 분리배출 전문가야. 사용자 질문에 정확하게 대답해줘." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Firebase에 질문/응답 저장
    const ref = db.ref("logs");
    ref.push({
      message: userMessage,
      response: reply,
      timestamp: new Date().toISOString()
    });

    res.json({ reply });

  } catch (error) {
    res.status(500).json({ reply: "GPT 호출 중 오류가 발생했습니다." });
  }
});

app.listen(3000, () => console.log("✅ GPT + Firebase 서버 실행 중: http://localhost:3000"));
