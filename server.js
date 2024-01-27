import express from "express"
import "dotenv/config.js"
import cors from "cors"
//const cors = require("cors")
import OpenAI from "openai"

const openai = new OpenAI(process.env.OPENAI_API_KEY)

const corsOptions = {
  origin: "http://127.0.0.1:5500", // Allow all origins
  methods: ["GET", "POST"], // Allow GET and POST requests
  allowedHeaders: ["Content-Type", "Authorization"], // Allow Content-Type and Authorization headers
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
)

let latestCompletion = null // Store the latest completion here

app.post("/api/completions", async (req, res) => {
  const userMood = req.body.userMood
  const userMoodReason = req.body.userMoodReason

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `User is feeling ${userMood}. The reason they're feeling this way is ${userMoodReason}. They struggle with their mental health at varying times to varying degrees. Please advise the user with good advice. If they are not doing well, point them to useful resources if necessary, for example therapists or psychiatrists in more extreme cases, but most cases to their family, friends, and trusted loved ones. Encourage solutions that get them away from being absorbed in technology online. Give them a list of things they can do to feel better. If they are doing well, advise them on how to keep it up and encourage them to keep doing the bahaviors that make them happy, as long as they are sustainable and healthy. Get very excited if they are doing well. Make sure you give a good amount of advice that is relevant to the situation. If they threaten themseleves point them to the suicide hotline. If they threaten others point them to call the police or to calm down and make a better choice. Specifically mention what they said in their userReasonMood so they feel listened to. Make sure the response is at least 300 words.`,
      },
    ],
    model: "gpt-3.5-turbo",
  })

  latestCompletion = completion.choices[0].message.content // Save the latest completion

  res.json(latestCompletion)
})

app.get("/api/completions", (req, res) => {
  if (latestCompletion) {
    res.send(latestCompletion) // Send the latest completion
  } else {
    res.send("No completion available.") // Send a default message if there's no completion
  }
})

app.listen(3020, () => {
  console.log("Server is running on port 3020")
})

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// to do: try changing this code into a serverless function so it works in vercel. Currently it would work in AWS
