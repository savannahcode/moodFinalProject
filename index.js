//import { moods } from "./moods.mjs"

let userMood = ``
let userMoodReason = ``
let userMoodAdvice = `You need some time to yourself. Take a break from your phone and computer. Go outside and get some fresh air. Take a walk. Talk to a friend or family member. You can also try meditating.`

let moods = [
  {
    mood: "HAPPY",
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

let moodLogs = []

// documment selectors
let otherMoodModal = document.getElementById("otherMoodModal")
let moodContinueBtn = document.getElementById("moodContinueBtn")
let otherMoodInput = document.getElementById("otherMoodInput")
let moodBtnGroup = document.getElementById("moodBtnGroup")
let submitBtn1 = document.querySelector(".submitBtn1")
let questionAsker = document.getElementById("questionAsker")
let selectMoodModal = document.getElementById("selectMoodModal")
let closeErrorBtn = document.getElementById("closeErrorBtn")
let submitBtn2 = document.querySelector(".submitBtn2")
let submitBtnHolder = document.getElementById("submitBtnHolder")
let hiddenAdvice = document.getElementById("hiddenAdvice")
let entriesHolder = document.getElementById("entriesHolder")

// JavaScript for page1.html

hiddenAdvice.style.display = "none"

moods.forEach(function (emotion) {
  moodBtnGroup.innerHTML += `<button
  class="moodBtn focus:drop-shadow-chosen focus:scale-110 m-3 flex flex-col drop-shadow-glow hover:drop-shadow-select transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 items-center"
>
  <span class="text-6xl">${emotion.htmlCode}</span
  ><span class="font-Lexend">${emotion.mood}</span>
</button>`
})
moodBtnGroup.innerHTML += `<button
class="btn btn-outline focus:drop-shadow-chosen focus:scale-110 text-sky-50 m-3 drop-shadow-glow hover:drop-shadow-select transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105"
id="otherMoodBtn"
>
OTHER MOOD
</button>`

document.addEventListener("DOMContentLoaded", function () {
  let otherMoodBtn = document.getElementById("otherMoodBtn")
  let moodBtns = document.querySelectorAll(".moodBtn")

  otherMoodBtn.addEventListener("click", function (event) {
    event.stopPropagation()
    otherMoodModal.showModal()
  })

  moodContinueBtn.addEventListener("click", function () {
    userMood = otherMoodInput.value
    otherMoodModal.close()
    console.log(userMood)
  })

  moodBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      userMood = this.children[1].innerText.toLowerCase()
      console.log(userMood)
    })
  })

  closeErrorBtn.addEventListener("click", function () {
    selectMoodModal.close()
  })

  submitBtn1.addEventListener("click", function (event) {
    event.stopPropagation()
    if (userMood === ``) {
      selectMoodModal.showModal()
      return
    } else {
      moodBtnGroup.innerHTML = `<textarea rows="10" cols="50" class="textarea text-area-bordered break-words min-w-2/3 h-96 rounded-2xl p-5 text-sky-50 bg-slate-900" placeholder="It was an off day, It was a good day, I went to a place... etc."></textarea>`
      questionAsker.innerHTML = `Why are you feeling ${userMood} today?`
    }

    submitBtnHolder.innerHTML = `<button class="btn btn-outline text-sky-50 mx-3 text-4xl my-12 submitBtn2">SUBMIT</button>`
  })

  submitBtnHolder.addEventListener("click", function (event) {
    if (event.target.classList.contains("submitBtn2")) {
      userMoodReason = document.querySelector(".textarea").value
      console.log(userMoodReason)
      submitBtnHolder.innerHTML = ``
      moodBtnGroup.innerHTML = ``
      questionAsker.innerHTML = `Your Caring AI Recommendation:`
      hiddenAdvice.style.display = "block"
      hiddenAdvice.firstChild.innerText = `${userMoodAdvice}`
      moodLogs.push({
        mood: userMood,
        reason: userMoodReason,
        advice: userMoodAdvice,
      })
      console.log(moodLogs)
      // Convert moodLogs array to JSON and store it in localStorage
      localStorage.setItem("moodLogs", JSON.stringify(moodLogs))

      console.log(moodLogs)
    }
  })
})

if (window.location.pathname === "/pastEntries.html") {
  // Check if moodLogs data exists in localStorage
  if (localStorage.getItem("moodLogs")) {
    // Retrieve moodLogs data from localStorage and convert it back to an array
    let moodLogs = JSON.parse(localStorage.getItem("moodLogs"))

    // Now you can use moodLogs array
    console.log(moodLogs)
  }
  console.log("I'm in pastEntires.html")
  console.log(moodLogs)
  moodLogs.forEach(function (log) {
    entriesHolder.innerHTML += `<div class="m-3 p-3 bg-slate-900 rounded-2xl">
    <h2 class="text-2xl font-Lexend">${log.mood}</h2>
    <h3 class="text-xl font-Lexend">${log.reason}</h3>
    <p class="text-lg font-Lexend">${log.advice}</p>`
  })
}
