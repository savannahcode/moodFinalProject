let userMood = ``
let userMoodReason = ``
let userMoodAdvice = `You need some time to yourself. Take a break from your phone and computer. Go outside and get some fresh air. Take a walk. Talk to a friend or family member. You can also try meditating.`

document.addEventListener("DOMContentLoaded", (event) => {
  let loadingBar = document.getElementById("loadingBar")
  loadingBar.style.display = "none"
  // rest of your code...
})

// documment selectors
let otherMoodBtn = document.getElementById("otherMoodBtn")
let otherMoodModal = document.getElementById("otherMoodModal")
let moodContinueBtn = document.getElementById("moodContinueBtn")
let otherMoodInput = document.getElementById("otherMoodInput")
let moodBtns = document.querySelectorAll(".moodBtn")
let moodBtnGroup = document.getElementById("moodBtnGroup")
let submitBtn1 = document.querySelector(".submitBtn1")
let questionAsker = document.getElementById("questionAsker")
let selectMoodModal = document.getElementById("selectMoodModal")
let closeErrorBtn = document.getElementById("closeErrorBtn")
let submitBtn2 = document.querySelector(".submitBtn2")
let submitBtnHolder = document.getElementById("submitBtnHolder")
let hiddenAdvice = document.getElementById("hiddenAdvice")
let loadingBar = document.getElementById("loadingBar")

hiddenAdvice.style.display = "none"
loadingBar.style.display = "none"

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
    loadingBar.style.display = "block"
    questionAsker.innerHTML = `Your Caring AI Recommendation:`
    fetch("http://localhost:3010/api/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMood: userMood,
        userMoodReason: userMoodReason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data)
        userMoodAdvice = data
        hiddenAdvice.firstChild.innerText = `${userMoodAdvice}`
        loadingBar.style.display = "none"
        hiddenAdvice.style.display = "block"
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
})
