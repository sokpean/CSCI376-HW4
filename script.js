// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer.

const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Madrid", correct: false },
        { text: "Berlin", correct: false },
        { text: "Paris", correct: true },
        { text: "Rome", correct: false }
      ]
    },
    {
      question: "Which language runs in a web browser?",
      answers: [
        { text: "Java", correct: false },
        { text: "C", correct: false },
        { text: "Python", correct: false },
        { text: "JavaScript", correct: true }
      ]
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Cascading Style Sheets", correct: true },
        { text: "Colorful Style Scripts", correct: false },
        { text: "Computer Style Sheets", correct: false },
        { text: "Creative Style Syntax", correct: false }
      ]
    },
    // fourth question below
    { 
      question: "Which is NOT one of the three main frontend development languages?",
      answers: [
        { text: "Java", correct: true },
        { text: "Javascript", correct: false },
        { text: "HTML", correct: false },
        { text: "CSS", correct: false }
      ]
    }
  ];
  
  // 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
  // We search or ID in "". These ID were created in the index.html file. 
  // The "question" ID refers to the <div id="question">Question text goes here</div> line in the index.html file. This ID refers to the questions asked.
  // The "answer-buttons" ID refers to <div id="answer-buttons" class="btn-grid"></div> line in index.html. This ID refers to the list of answer options button. 
  // the "next-btn" ID refers to <button type="button" id="next-btn" class="next-btn btn">Next</button> line in indez.html. This ID refers to the next button after you select an answer
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const hintButton = document.getElementById("hint-btn");
  
  let currentQuestionIndex = 0;
  let score = 0;
  let hintUsed = false;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.textContent = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    hintUsed = false;
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // these elements are dynamically created in JS because they need to be able to change with questions. 
      // The question and answer changes for each questions so this way you don't need to create for buttons for each questions. 
      // The next button is static in the HTML file because it doesn't need to change with each iteration of the questions cycle. 
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      // 4. What is the line below doing? 
      // this line takes each newly created buttons and adds it in the index.html file under "answer-button" container.
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    hintButton.style.display = "inline-block";
    answerButtonsElement.innerHTML = "";
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("wrong");
    }
  
    Array.from(answerButtonsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // This line makes the next button visible to the user. Without the line, the next button would not appear, causing the user to be stuck on one question
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    nextButton.textContent = "Restart";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  hintButton.addEventListener("click", () => {
    if (hintUsed) return;
    const buttons = Array.from(answerButtonsElement.children);
    const incorrectButtons = buttons.filter(
      button => button.dataset.correct !== "true" && !button.classList.contains("wrong")
    );
    if (incorrectButtons.length > 0) {
      const randomWrong = incorrectButtons[Math.floor(Math.random() * incorrectButtons.length)];
      randomWrong.classList.add("wrong");
      hintUsed = true;
    }
  });

  // 6. Summarize in your own words what you think this block of code is doing. 
  // This block of code keeps track of the total number of questions left. 
  // If the current question is not the last question then go to the next question. 
  // If the current question is the last question then restart the quiz.
  nextButton.addEventListener("click", () => { 
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });
  
  startQuiz();
  