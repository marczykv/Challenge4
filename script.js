// Define an array of quiz questions and their options
const quizQuestions = [
  {
    question: "What is the result of 2 + 2?",
    options: ["2", "4", "6", "8"],
    answer: 1,
  },
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["variable = 5", "var 5", "let = 5", "var x = 5"],
    answer: 3,
  },
  {
    question: "In CSS, how do you select elements by their class attribute?",
    options: ["<class", ".class", "class", "=class"],
    answer: 1,
  },
  // Add more questions here
];

// Set variables to track the current question, score, and timer
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 75;

// Get DOM elements
const timerElement = document.getElementById("time");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save-btn");
const resultElement = document.getElementById("result");
const resultLabelElement = document.getElementById("resultLabel");

// Function to start the quiz
function startQuiz() {
  // Hide the start button
  document.getElementById("start-btn").style.display = "none";

  // Display the quiz elements
  questionElement.style.display = "block";
  optionsElement.style.display = "block";

  // Reset the timer
  clearInterval(timerInterval);
  timeLeft = 75;
  timerElement.textContent = timeLeft;

  // Start the timer
  startTimer();

  // Display the first question
  displayQuestion();
}

// Function to display the current question
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = document.createElement("button");
    option.textContent = currentQuestion.options[i];
    option.addEventListener("click", submitAnswer);
    optionsElement.appendChild(option);
  }
}

// Function to handle user answer submission
function submitAnswer(event) {
  const selectedOption = event.target;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (currentQuestion.answer === Array.from(optionsElement.children).indexOf(selectedOption)) {
    // Correct answer
    resultLabelElement.textContent = "Correct";
    resultElement.classList.add("correct");
    resultElement.classList.remove("wrong");
    score++;
  } else {
    // Incorrect answer
    resultLabelElement.textContent = "Wrong";
    resultElement.classList.add("wrong");
    resultElement.classList.remove("correct");
    subtractTime();
  }

  // Disable all options after selection
  const options = Array.from(optionsElement.children);
  options.forEach((option) => {
    option.removeEventListener("click", submitAnswer);
  });

  // Display the result
  resultElement.appendChild(resultLabelElement);

  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    setTimeout(() => {
      displayQuestion();
      enableOptions(); // Re-enable options after displaying the question
      resultElement.innerHTML = ""; // Clear the result after displaying the next question
    }, 1000); // Delay before displaying the next question
  } else {
    setTimeout(endQuiz, 1000); // Delay before ending the quiz
  }
}

// Function to enable all options for the current question
function enableOptions() {
  const options = Array.from(optionsElement.children);
  options.forEach((option) => {
    option.addEventListener("click", submitAnswer);
  });
}

// Function to subtract time for incorrect answers
function subtractTime() {
  timeLeft -= 5; // Subtract 5 seconds
  if (timeLeft < 0) {
    timeLeft = 0;
  }
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Hide quiz elements
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  submitButton.style.display = "none";

  // Display the final score and remaining time
  scoreElement.textContent = score;
  timerElement.textContent = timeLeft;
  scoreContainer.style.display = "block";

  // Save the score and reset the quiz when the save button is clicked
  saveButton.addEventListener("click", function () {
    saveScore();
    resetQuiz(); // Reset the quiz after saving the score
  });
}

// Function to save the score with initials and return to the main menu
function saveScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    // Save the score and initials
    const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    const newScore = { initials, score };
    savedScores.push(newScore);
    localStorage.setItem("quizScores", JSON.stringify(savedScores));
  }

  // Clear the initials input value
  initialsInput.value = "";

  // Return to the main menu
  resetQuiz();
}

// Function to reset the quiz
function resetQuiz() {
  // Reset the variables
  currentQuestionIndex = 0;
  score = 0;

  // Reset the timer
  clearInterval(timerInterval);
  timeLeft = 75;

  // Hide the score container
  scoreContainer.style.display = "none";

  // Clear the result
  resultElement.innerHTML = "";

  // Show the start button
  document.getElementById("start-btn").style.display = "block";
}

const startButton = document.getElementById("start-btn");

// Add an event listener to the start button
startButton.addEventListener("click", startQuiz);
