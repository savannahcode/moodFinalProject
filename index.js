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
  } else {
    moodBtnGroup.innerHTML = `<textarea rows="10" cols="50" class="textarea text-area-bordered break-words min-w-2/3 h-96 rounded-2xl p-5 text-sky-50 bg-slate-900" placeholder="It was an off day, It was a good day, I went to a place... etc."></textarea>`
    questionAsker.innerHTML = `Why are you feeling ${userMood} today?`
  }
})
