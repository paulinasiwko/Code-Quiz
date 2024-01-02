const startScreen = document.querySelector('#start-screen');
const questions = document.querySelector('#questions');
const questionTitle = document.querySelector('#question-title');
const choices = document.querySelector('#choices');
const startButton = document.querySelector('#start');
const feedback = document.querySelector('#feedback');
const endScreen = document.querySelector('#end-screen');
const finalScore = document.querySelector('#final-score');
const initials = document.querySelector('#initials');
const submitInitials = document.querySelector('#submit');
const time = document.querySelector('#time');

let activeQuestionIndex = 0;
let userInput = {
    userInitials: '',
    userScore: 0
}

let question = [
    {
        q: 'What did Joey buy for Chandler because they are best friends?',
        a: {
            1: 'Pizza', 
            2: 'Framed picture', 
            3: 'Watch', 
            4: 'Bracelet'
        },
        correctAnswer: 4
    },
    {
        q: 'Which character says the last ever line in the series?',
        a: {
            1: 'Gunther', 
            2: 'Phoebe', 
            3: 'Chandler', 
            4: 'Rachel'
        },
        correctAnswer: 3
    },
    {
        q: 'What is the name of Joey’s acting agent?',
        a: {
            1: 'Andrea', 
            2: 'Estelle', 
            3: 'Martha', 
            4: 'Carol'
        },
        correctAnswer: 2
    },
    {
        q: 'In which city is Friends set?',
        a: {
            1: 'Los Angeles', 
            2: 'Miami', 
            3: 'Seattle', 
            4: 'New York City'
        },
        correctAnswer: 4
    },
    {
        q: 'Phoebe has a twin sister. What is her name?',
        a: {
            1: 'Ursula', 
            2: 'Scarlett', 
            3: 'Rita', 
            4: 'Sharon'
        },
        correctAnswer: 1
    }
]

let count = 75;
time.textContent = count;

startButton.addEventListener('click', function(e) {
    e.preventDefault();
    startScreen.setAttribute('class', 'hide');
    questions.removeAttribute('class', 'hide');

    const timer = setInterval(function() {
        count--;
        time.textContent = count;
        if (count === 0) {
            clearInterval(timer);
            questions.setAttribute('class', 'hide');
            endScreen.removeAttribute('class', 'hide');
            finalScore.textContent = userInput.userScore;
        }
    }, 1000);

    displayQuestion();

    function displayQuestion() {

        questionTitle.textContent = question[activeQuestionIndex].q;
        choices.textContent = '';

        for (let i = 1; i <= 4; i++) {
            let singleChoice = document.createElement('button');
            singleChoice.setAttribute('id', i);
            singleChoice.textContent = question[activeQuestionIndex].a[i];
    
            singleChoice.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (+singleChoice.id === question[activeQuestionIndex].correctAnswer) {
                    feedback.setAttribute('class', 'feedback');
                    feedback.textContent = 'Correct!';
                    userInput.userScore++;
                    activeQuestionIndex++;
                    if (activeQuestionIndex < question.length) {
                        displayQuestion();
                    } else {
                        questions.setAttribute('class', 'hide');
                        endScreen.removeAttribute('class', 'hide');
                        finalScore.textContent = userInput.userScore;
                        clearInterval(timer);
                    }                
                } else {
                    feedback.setAttribute('class', 'feedback');
                    feedback.textContent = 'Wrong!';
                    activeQuestionIndex++;
                    count -= 10;
                    time.textContent = count;

                    if (activeQuestionIndex < question.length) {
                        displayQuestion();
                    } else {
                        questions.setAttribute('class', 'hide');
                        endScreen.removeAttribute('class', 'hide');
                        finalScore.textContent = userInput.userScore;
                        clearInterval(timer);
                    }               
                }
            })
            choices.appendChild(singleChoice);  
        }     
    }
})


submitInitials.addEventListener('click', function(e) {
    e.preventDefault();
    userInput.userInitials = initials.value;
    window.location.href = 'highscores.html';
    localStorage.setItem('userInput', JSON.stringify(userInput));
})


