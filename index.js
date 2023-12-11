let userMood = `angry`
let userMoodReason = `I failed a test and finals are very stressful. I feel like there's not enough time in the day to get everything done.`

// documment selectors
let otherMoodBtn = document.getElementById("otherMoodBtn")
let otherMoodModal = document.getElementById("otherMoodModal")
let moodContinueBtn = document.getElementById("moodContinueBtn")
let otherMoodInput = document.getElementById("otherMoodInput")
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
    // Remove the 'active' class from all buttons
    moodBtns.forEach(function (otherBtn) {
      otherBtn.classList.remove("drop-shadow-chosen")
      otherBtn.classList.remove("scale-110")
    })

    // Add the 'active' class to the clicked button
    this.classList.add("drop-shadow-chosen")
    this.classList.add("scale-110")
    console.log(this)

    userMood = this.children[1].innerText.toLowerCase()
    console.log(userMood)
  })
})
