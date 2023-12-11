// documment selectors
let otherMoodBtn = document.getElementById("otherMoodBtn")
let otherMoodModal = document.getElementById("otherMoodModal")

otherMoodBtn.addEventListener("click", function () {
  console.log("otherMoodBtn clicked")
  otherMoodModal.showModal()
  //userMood = document.getElementById("otherMood").value
})
