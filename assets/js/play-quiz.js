const questionList = document.querySelector(".questions");
const timerElement = document.querySelector(".timer");
const nextButton = document.querySelector(".next-btn");

(() => {
  const questions = localStorage.getItem("questions");
  let answerData = { correct: 0, incorrect: 0, total: 0 };
  let questionIndex = 0;
  let timeLeft = 120;
  let countdown;

  //timer
  function updateTimer() {
    if (JSON.parse(questions).length !== 0) {
      timerElement.textContent = `Time left: ${timeLeft}s`;
      timeLeft--;
    }

    if (timeLeft < 0) {
      clearInterval(countdown);
      alert("Time is up!");
      nextButton.disabled = true;
      showResults();
    }
  }

  //render a question
  const renderQuestion = (question) => {
    if (question) {
      questionList.innerHTML = `
      <li class="question-item">
        <h3 class="question">${question?.question}</h3>
        ${question?.options
          .map(
            (option, i) => `
          <div class="answer-field">
            <input type="radio" name="answer" id="answer${i}" />
            <label for="answer${i}">${option
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")}</label>
          </div>`
          )
          .join("")}
      </li>`;
    } else {
      questionList.innerHTML = "<p>No questions found</p>";
    }
  };

  //answer checking
  const handleAnswer = (questionsArray) => {
    const selectedOption = document.querySelector(
      'input[name="answer"]:checked'
    );
    if (!selectedOption) return; // If no answer is selected, skip

    const selectedAnswer = selectedOption.nextElementSibling.textContent;
    const correctAnswerIndex =
      parseInt(questionsArray[questionIndex]?.correctAnswer.slice(-1)) - 1;
    const correctAnswer =
      questionsArray[questionIndex]?.options[correctAnswerIndex];

    if (selectedAnswer === correctAnswer) {
      answerData.correct++;
    } else {
      answerData.incorrect++;
    }
  };

  //show results
  const showResults = () => {
    clearInterval(countdown); // Stop timer if running
    questionList.innerHTML = `
      <p>Correct: ${answerData.correct}</p>
      <p>Incorrect: ${answerData.incorrect}</p>
      <p>Total: ${answerData.total}</p>
    `;
  };

  if (questions) {
    const questionsArray = JSON.parse(questions);
    answerData.total = questionsArray.length;

    // Render the first question
    renderQuestion(questionsArray[questionIndex]);

    // Start the countdown timer
    countdown = setInterval(updateTimer, 1000);

    // Next button click event handler
    nextButton.addEventListener("click", () => {
      handleAnswer(questionsArray); // Check the answer

      questionIndex++;
      if (questionIndex < questionsArray.length) {
        renderQuestion(questionsArray[questionIndex]); // Render next question
      } else {
        showResults(); // Show final results when done
      }
    });
  } else {
    questionList.innerHTML = "<p>No questions found</p>";
  }
})();
