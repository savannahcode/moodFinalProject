import express from "express"
const app = express()
app.use(express.json())

// Serve static files from the "public" directory

let moods = [
  {
    mood: "HAPPY",
    // using UTF-8 alphabet
    htmlCode: "&#128512;",
  },
  {
    mood: "STRESSED",
    htmlCode: "&#128531;",
  },
  {
    mood: "IRRITATED",
    htmlCode: "&#128530;",
  },
  {
    mood: "SAD",
    htmlCode: "&#128532;",
  },
  {
    mood: "OVERWHELMED",
    htmlCode: "&#128534;",
  },
  {
    mood: "SILLY",
    htmlCode: "&#128540;",
  },
  {
    mood: "SUICIDAL",
    htmlCode: "&#128128;",
  },
  {
    mood: "FURIOUS",
    htmlCode: "&#128545;",
  },
  {
    mood: "CONFIDENT",
    htmlCode: "&#128527;",
  },
  {
    mood: "ECSTATIC",
    htmlCode: "&#128515;",
  },
  {
    mood: "SCARED",
    htmlCode: "&#128543;",
  },
  {
    mood: "EVIL",
    htmlCode: "&#128527;",
  },
  {
    mood: "DEPRESSED",
    htmlCode: "&#128542;",
  },
  {
    mood: "RELAXED",
    htmlCode: "&#128526;",
  },
  {
    mood: "ANXIOUS",
    htmlCode: "&#128547;",
  },
  {
    mood: "FATIGUED",
    htmlCode: "&#128564;",
  },
  {
    mood: "EMBARASSED",
    htmlCode: "&#128563;",
  },
  {
    mood: "SICK",
    htmlCode: "&#128567;",
  },
]
// GET Mood options
app.get("/moods", (req, res) => {
  res.json(moods)
})

// GET SINGLE Mood
app.get("/moods/:mood", (req, res) => {
  const moodName = req.params.mood.toUpperCase()
  const mood = moods.find((m) => m.mood === moodName)

  if (mood) {
    res.json(mood)
  } else {
    res.status(404).json({ error: "Mood not found" })
  }
})

app.get("/", (req, res) => {
  res.send("Welcome to the Mood API!")
})

// POST Mood options
app.post("/moods", (req, res) => {
  const newMood = req.body
  moods.push(newMood)
  res.json(newMood)
})

// PUT Mood options (update)
app.put("/moods/:mood", (req, res) => {
  const moodName = req.params.mood.toUpperCase()
  const updatedMood = req.body
  const index = moods.findIndex((m) => m.mood === moodName)

  if (index !== -1) {
    // Merge existing mood with updated properties
    moods[index] = { ...moods[index], ...updatedMood }
    res.json(moods[index])
  } else {
    res.status(404).json({ error: "Mood not found" })
  }
})

// DELETE Mood options
app.delete("/moods/:mood", (req, res) => {
  const moodName = req.params.mood.toUpperCase()
  moods = moods.filter((m) => m.mood !== moodName)
  res.json({ mood: moodName })
})

app.listen(3078, () => console.log("Server running on port 3078"))
