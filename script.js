const questions=[
    {
        question: "Which is our national animal?",
        answers: [
            { text: "Tiger", correct: true},
            { text: "Elephant", correct: false},
            { text: "Lion", correct: false},
            { text: "Cheeta", correct: false},
        ]
    },
    {
        question: "Which is our national bird?",
        answers: [
            { text: "Peacock", correct: true},
            { text: " Pigeons", correct: false},
            { text: " Hummingbird", correct: false},
            { text: "Toucan", correct: false},
        ]
    },
    {
        question: "Which is our national tree?",
        answers: [
            { text: "banyan", correct: true},
            { text: "Cedar", correct: false},
            { text: "Alder", correct: false},
            { text: "Antarctic", correct: false},
        ]
    },
    {
        question: "Which is our national sport?",
        answers: [
            { text: "Hockey", correct: true},
            { text: "Cricket", correct: false},
            { text: "Kabadi", correct: false},
            { text: "Food Ball", correct: false},
        ]
    }
];
const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
    
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);  
});
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();

