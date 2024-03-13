const questions = [
    {
        question: "Which Indian state is known as the Land of Five Rivers?",
        answers: [
            { text: "Gujarat", correct: false},
            { text: "Punjab", correct: true},
            { text: "Rajasthan", correct: false},
            { text: "Kerala", correct: false},
        ]
    },
    {
        question: "Which state in India is famous for its tea gardens and is often referred to as the Scotland of the East?",
        answers: [
            { text: "Meghalaya", correct: true},
            { text: "Assam", correct: false},
            { text: "Himachal Pradesh", correct: false},
            { text: "Mizoram", correct: false},
        ]
    },
    {
        question: "The Ajanta and Ellora caves, UNESCO World Heritage Sites, are located in which Indian state?",
        answers: [
            { text: "Uttar Pradesh", correct: false},
            { text: "Tamil Nadu", correct: false},
            { text: " Madhya Pradesh", correct: false},
            { text: "Maharashtra", correct: true},
        ]
    }
    ,
    {
        question: "The city of Jaipur, famous for its pink-hued buildings, is the capital of which Indian state?",
        answers: [
            { text: " Uttar Pradesh", correct: false},
            { text: "Rajasthan", correct: true},
            { text: "Haryana", correct: false},
            { text: "Bihar", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();