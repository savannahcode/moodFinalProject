let userMood = ``
let userMoodReason = ``

// documment selectors
let otherMoodBtn = document.getElementById("otherMoodBtn")
let otherMoodModal = document.getElementById("otherMoodModal")
let moodContinueBtn = document.getElementById("moodContinueBtn")
let otherMoodInput = document.getElementById("otherMoodInput")
let moodBtns = document.querySelectorAll(".moodBtn")
let moodBtnGroup = document.getElementById("moodBtnGroup")
let submitBtn1 = document.getElementById("submitBtn1")
let questionAsker = document.getElementById("questionAsker")
let selectMoodModal = document.getElementById("selectMoodModal")
let closeErrorBtn = document.getElementById("closeErrorBtn")

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
  }
  moodBtnGroup.innerHTML = `<input class="input"></input>`
  questionAsker.innerHTML = `Why are you feeling ${userMood} today?`
})
