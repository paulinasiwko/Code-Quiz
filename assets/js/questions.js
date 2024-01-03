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
        q: 'Inside which HTML element do we put the JavaScript?',
        a: {
            1: '<script>', 
            2: '<javascript>', 
            3: '<scripting>', 
            4: '<js>'
        },
        correctAnswer: 1
    },
    {
        q: 'How do you write "Hello World" in an alert box?',
        a: {
            1: 'alertBox("Hello Word");', 
            2: 'msgBox("Hello Word");', 
            3: 'msg("Hello Word");', 
            4: 'alert("Hello Word");'
        },
        correctAnswer: 4
    },
    {
        q: 'How to write an IF statement in JavaScript?',
        a: {
            1: 'if (i == 5)', 
            2: 'if i = 5 then', 
            3: 'if i == 5 then', 
            4: 'if i = 5'
        },
        correctAnswer: 1
    },
    {
        q: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        a: {
            1: 'if i <> 5', 
            2: 'if i =! 5 then', 
            3: 'if (i <> 5)', 
            4: 'if (i != 5)'
        },
        correctAnswer: 4
    },
    {
        q: 'How does a FOR loop start?',
        a: {
            1: 'for (i <= 5; i++)', 
            2: 'for (let i = 0; i <=5; i++)', 
            3: 'for i = 1 to 5', 
            4: 'for (i = 0l i <=5)'
        },
        correctAnswer: 2
    },
    {
        q: 'What is the correct way to write a JavaScript array?',
        a: {
            1: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 
            2: 'var colors = "red", "green", "blue"', 
            3: 'var colors = (1:"red", 2:"green", 3:"blue")', 
            4: 'var colors = ["red", "green", "blue"]'
        },
        correctAnswer: 4
    },
    {
        q: 'Which event occurs when the user clicks on an HTML element?',
        a: {
            1: 'onmouseover', 
            2: 'onchange', 
            3: 'onclick', 
            4: 'onmouseclick'
        },
        correctAnswer: 3
    },
    {
        q: 'Which operator is used to assign a value to a variable?',
        a: {
            1: '*', 
            2: '-', 
            3: '=', 
            4: 'x'
        },
        correctAnswer: 3
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
        if (count <= 0 ) {
            clearInterval(timer);
            questions.setAttribute('class', 'hide');
            endScreen.removeAttribute('class', 'hide');
            finalScore.textContent = userInput.userScore;
            time.textContent = "Time's up!";
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
    
    // localStorage used below was inspired by this tutorial: https://www.youtube.com/watch?v=DFhmNLKwwGw&ab_channel=JamesQQuick
    const allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];
    allUsers.push(userInput);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
})


