// server.js
import express from "express"
import { OpenAI } from "openai"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
const openai = new OpenAI(process.env.OPENAI_API_KEY)

app.use(express.json())
app.use(cors())
app.options("*", cors())

app.post("/generate", async (req, res) => {
  const { userMood, userMoodReason } = req.body
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `User is feeling ${userMood}. The reason they're feeling this way is ${userMoodReason}. They struggle with their mental health at varying times to varying degrees. Please advise the user with good advice. Pointing them to useful resources if necessary, for example therapists or psychiatrists in more extreme cases, but most cases to their family, friends, and trusted loved ones. Encourage solutions that get them away from being absorbed in technology online. If they are doing well, advise them on how to keep it up.`,
      },
    ],
    model: "gpt-3.5-turbo",
  })

  res.json(completion.choices[0].message.content)
})

app.listen(3000, () => console.log("Server listening on port 3000"))
