
const questions = [
    {
        question: "Which language is used to structure a web page?",
        answers: ["CSS", "HTML", "Python", "SQL"],
        correct: "HTML"
    },
    {
        question: "Which language is used to style a web page?",
        answers: ["CSS", "Java", "PHP", "C++"],
        correct: "CSS"
    },
    {
        question: "Which keyword declares a variable that can be reassigned?",
        answers: ["const", "fixed", "let", "static"],
        correct: "let"
    },
    {
        question: "Which method selects an element by its ID?",
        answers: [
            "document.getElementById()",
            "document.getClass()",
            "window.getElement()",
            "document.findId()"
        ],
        correct: "document.getElementById()"
    },
    {
        question: "Which function runs code repeatedly after a set interval?",
        answers: ["setTimeout()", "setInterval()", "alert()", "prompt()"],
        correct: "setInterval()"
    }
];

const QUESTION_TIME = 15;

const questionCounter = document.getElementById("questionCounter");
const scoreDisplay = document.getElementById("scoreDisplay");
const timerDisplay = document.getElementById("timer");
const timerBar = document.getElementById("timerBar");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("nextButton");
const quizContent = document.getElementById("quizContent");
const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");
const restartButton = document.getElementById("restartButton");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = QUESTION_TIME;
let timerInterval = null;
let answered = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answered = false;

    quizContent.hidden = false;
    resultScreen.hidden = true;

    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);

    answered = false;
    timeLeft = QUESTION_TIME;

    const currentQuestion = questions[currentQuestionIndex];

    questionCounter.textContent =
        `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;
    questionElement.textContent = currentQuestion.question;
    feedback.textContent = "";
    nextButton.hidden = true;
    answerButtons.innerHTML = "";

    currentQuestion.answers.forEach(function (answer) {
        const button = document.createElement("button");

        button.textContent = answer;
        button.className = "answer-btn";
        button.type = "button";

        button.addEventListener("click", function () {
            selectAnswer(button, answer);
        });

        answerButtons.appendChild(button);
    });

    updateTimerDisplay();
    startTimer();
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerDisplay.textContent = `${timeLeft}s`;

    const percentage = (timeLeft / QUESTION_TIME) * 100;
    timerBar.style.width = `${percentage}%`;

    if (timeLeft <= 5) {
        timerBar.style.background = "#fb7185";
        timerDisplay.style.color = "#fb7185";
    } else {
        timerBar.style.background = "#67e8c0";
        timerDisplay.style.color = "#67e8c0";
    }
}

function selectAnswer(selectedButton, selectedAnswer) {
    if (answered) return;

    answered = true;
    clearInterval(timerInterval);

    const correctAnswer = questions[currentQuestionIndex].correct;
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "#67e8c0";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "#fb7185";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results"
            : "Next Question";

    nextButton.hidden = false;
}

function timeUp() {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestionIndex].correct;
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    feedback.textContent = `Time is up! Answer: ${correctAnswer}`;
    feedback.style.color = "#fb7185";

    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "See Results"
            : "Next Question";

    nextButton.hidden = false;
}

function showResults() {
    clearInterval(timerInterval);

    quizContent.hidden = true;
    resultScreen.hidden = false;

    finalScore.textContent =
        `Your score: ${score} out of ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Excellent work!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good job! Keep learning and improving.";
    } else {
        resultMessage.textContent = "Keep practicing. You can do even better!";
    }
}

nextButton.addEventListener("click", function () {
    if (!answered) return;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", startQuiz);

startQuiz();
