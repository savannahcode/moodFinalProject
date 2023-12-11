import express from "express"
import "dotenv/config.js"
import cors from "cors"
const cors = require("cors")
import OpenAI from "openai"

const openai = new OpenAI(process.env.OPENAI_API_KEY)

const corsOptions = {
  origin: "https://localhost:3000", // Allow all origins
  methods: ["GET", "POST"], // Allow GET and POST requests
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
}

app.use(cors(corsOptions))
const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.post("/api/completions", async (req, res) => {
  const userMood = req.body.userMood
  const userMoodReason = req.body.userMoodReason

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `User is feeling ${userMood}. The reason they're feeling this way is ${userMoodReason}. They struggle with their mental health at varying times to varying degrees. Please advise the user with good advice. Pointing them to useful resources if necessary, for example therapists or psychiatrists in more extreme cases, but most cases to their family, friends, and trusted loved ones. Encourage solutions that get them away from being absorbed in technology online. If they are doing well, advise them on how to keep it up. Make sure you give a good amount of advice that is relevant to the situation. Threatening themseleves or others is an extreme case. Give them a list of things they can do to feel better. Specifically mention what they said in their userReasonMood so they feel listened to. Make sure the response is at least 500 words.`,
      },
    ],
    model: "gpt-3.5-turbo",
  })

  res.json(completion.choices[0].message.content)
})

app.listen(3000, () => console.log("Server listening on port 3000"))

app.get("/", (req, res) => {
  res.send("Hello, world!")
})
