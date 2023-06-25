// Define an array of quiz questions and their options
const quizQuestions = [
    {
      question: "What is the result of 2 + 2?",
      options: ["2", "4", "6", "8"],
      answer: 1,
      timer: 10
    },
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["variable = 5", "var 5", "let = 5", "var x = 5"],
      answer: 3,
      timer: 15
    },
    {
        question: "In CSS, how do you select elements by their class attribute?",
        options: ["<class", ".class", "class", "=class"],
        answer: 2,
        timer: 10
      },
      {
        question: "What is the result of 2 + 2?",
        options: ["2", "4", "6", "8"],
        answer: 1,
        timer: 10
      },
      {
        question: "What is the result of 2 + 2?",
        options: ["2", "4", "6", "8"],
        answer: 1,
        timer: 10
      },
      {
        question: "What is the result of 2 + 2?",
        options: ["2", "4", "6", "8"],
        answer: 1,
        timer: 10
      },
    // Add more questions here
  ];
  
  // Set variables to track the current question, score, and timer
  let currentQuestionIndex = 0;
  let score = 0;
  let timerInterval;
  let timeLeft = quizQuestions[currentQuestionIndex].timer;
  
  // Get DOM elements
  const timerElement = document.getElementById("time");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit-btn");
  const scoreContainer = document.getElementById("score-container");
  const scoreElement = document.getElementById("score");
  const initialsInput = document.getElementById("initials");
  const saveButton = document.getElementById("save-btn");
  
  // Function to start the quiz
  function startQuiz() {
    // Hide the start button
    document.getElementById("start-btn").style.display = "none";
    
    // Display the quiz elements
    questionElement.style.display = "block";
    optionsElement.style.display = "block";
    submitButton.style.display = "block";
    
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
    
    // Reset the timer for the current question
    timeLeft = currentQuestion.timer;
    timerElement.textContent = timeLeft;
  }
  
  // Function to handle user answer submission
  function submitAnswer(event) {
    const selectedOption = event.target;
    const currentQuestion = quizQuestions[currentQuestionIndex];
  
    if (currentQuestion.answer === Array.from(optionsElement.children).indexOf(selectedOption)) {
      // Correct answer
      score++;
    } else {
      // Incorrect answer
      subtractTime();
      return; // Exit the function without progressing to the next question
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
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
      timerElement.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
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
    
    // Display the final score and initials input field
    scoreElement.textContent = score;
    scoreContainer.style.display = "block";
  }
  
  // Function to save the score with initials
  function saveScore() {
    const initials = initialsInput.value.trim();
    
    if (initials !== "") {
      // Save the score and initials
      const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
      const newScore = { initials, score };
      savedScores.push(newScore);
      localStorage.setItem("quizScores", JSON.stringify(savedScores));
    }
  }

  const startButton = document.getElementById("start-btn");

// Add an event listener to the start button
startButton.addEventListener("click", startQuiz);

function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);
  
    // Hide quiz elements
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    submitButton.style.display = "none";
  
    // Display the final score and initials input field
    scoreElement.textContent = score;
    scoreContainer.style.display = "block";
  
    // Save the score when the save button is clicked
    saveButton.addEventListener("click", saveScore);
  }
  
  // Function to save the score with initials
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
  
    // Reset the quiz to the initial state
    resetQuiz();
  }
  
  // Function to reset the quiz
  function resetQuiz() {
    // Reset the variables
    currentQuestionIndex = 0;
    score = 0;
  
    // Hide the score container
    scoreContainer.style.display = "none";
  
    // Clear the local storage
    localStorage.removeItem("quizScores");
  
    // Start the quiz again
    startQuiz();
  }