import API_URL from "./config.js"

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
  const response = await fetch(`${API_URL}/api/generate`, {
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
