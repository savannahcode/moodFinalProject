const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://mood-mental-health-bd1224syt-savannahcode.vercel.app"
    : "http://localhost:3000"

let userMood = `angry`
let userMoodReason = `I failed a test and finals are very stressful. I feel like there's not enough time in the day to get everything done.`

// documment selectors
let otherMoodBtn = document.getElementById("otherMoodBtn")
let otherMoodModal = document.getElementById("otherMoodModal")

otherMoodBtn.addEventListener("click", function () {
  console.log("otherMoodBtn clicked")
  otherMoodModal.showModal()
  generateText(userMood, userMoodReason)
    .then((text) => {
      console.log(text)
      otherMoodModal.textContent = text
    })
    .catch((error) => console.error(error))
  //userMood = document.getElementById("otherMood").value
})

// index.js
async function generateText(userMood, userMoodReason) {
  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMood, userMoodReason }),
  })
  const text = await response.json()
  return text
}

generateText(userMood, userMoodReason)
  .then((text) => console.log(text))
  .catch((error) => console.error(error))
