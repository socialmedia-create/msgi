const imageList = [
  "images/camp1.jpg",
  "images/camp2.jpg",
  "images/camp3.jpg",
  "images/camp4.jpg"
];

let currentIndex = 0;

const sceneImage = document.getElementById("scene-image");
const nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < imageList.length) {
    sceneImage.style.opacity = 0;
    setTimeout(() => {
      sceneImage.src = imageList[currentIndex];
      sceneImage.style.opacity = 1;
    }, 500);
  } else {
    nextBtn.style.display = "none";
    alert("🎉 You've completed the campus tour!");
  }
});
