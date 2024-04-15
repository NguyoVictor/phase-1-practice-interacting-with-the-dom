"use strict";

// Flag to track playing state
let playing = true;

// Variable to hold the interval ID
let interval;

// Function to create a timer interval
function timer() {
  return setInterval(() => {
    const counter = document.getElementById("counter");
    const currentCount = parseInt(counter.innerText);
    counter.innerText = currentCount + 1;
  }, 1000); // Update every second
}

// Start the timer
interval = timer();

// Button references
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");

// Form reference
const commentForm = document.getElementsByTagName("form")[0];

// Minus button click handler
minusButton.addEventListener("click", () => {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  counter.innerText = Math.max(currentCount - 1, 0); // Ensure counter doesn't go negative
});

// Plus button click handler
plusButton.addEventListener("click", () => {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  counter.innerText = currentCount + 1;
});

// Heart button click handler
heartButton.addEventListener("click", () => {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  const likesList = document.querySelector(".likes");
  let likedElement;

  // Check if the count has already been liked
  if (Array.from(likesList.children)
    .map(element => parseInt(element.dataset.num))
    .includes(currentCount)) {
    likedElement = document.querySelector(`[data-num="${currentCount}"]`);
    const likeSpan = likedElement.children[0];
    const currentLikes = parseInt(likeSpan.innerText);
    likeSpan.innerText = `${currentCount} has been liked ${currentLikes + 1} times`;
  } else {
    // Create a new like element for the count
    likedElement = document.createElement("li");
    likedElement.setAttribute("data-num", currentCount);
    likedElement.innerHTML = `${currentCount} has been liked <span>1</span> time`;
    likesList.appendChild(likedElement);
  }
});

// Pause button click handler
pauseButton.addEventListener("click", () => {
  if (playing) {
    playing = false;
    clearInterval(interval);
    pauseButton.innerText = "resume";
    // Disable other buttons while paused
    minusButton.disabled = true;
    plusButton.disabled = true;
    heartButton.disabled = true;
  } else {
    playing = true;
    interval = timer(); // Restart the timer
    pauseButton.innerText = "pause";
    // Enable other buttons while resumed
    minusButton.disabled = false;
    plusButton.disabled = false;
    heartButton.disabled = false;
  }
});

// Comment form submit handler
commentForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  const commentInput = commentForm.children[0];
  const commentText = commentInput.value;

  // Clear the comment input field
  commentInput.value = "";

  const commentsList = document.querySelector(".comments");
  const commentElement = document.createElement("p");
  commentElement.innerText = commentText;

  commentsList.appendChild(commentElement);
});
