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
            2: 'Framed picture of a chimp', 
            3: 'Watch', 
            4: 'Bracelet'
        },
        correctAnswer: 4
    },
    {
        q: `What are Monica and Ross' parents called?`,
        a: {
            1: 'Jack and Judy', 
            2: 'Jack and Jill', 
            3: 'Peter and Margaret', 
            4: 'Gerry and Mary'
        },
        correctAnswer: 1
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
            4: 'Carole'
        },
        correctAnswer: 2
    },
    {
        q: 'What did Ross dress up as to teach Ben about Christmas and Hanukkah?',
        a: {
            1: 'The Holiday Aardvark', 
            2: 'The Holiday Armadillo', 
            3: 'The Holiday Turtle', 
            4: 'The Holiday Tortoise'
        },
        correctAnswer: 2
    },
    {
        q: 'Which job did Rachel’s fiancé Barry Farber do?',
        a: {
            1: 'Lawyer', 
            2: 'Plumber', 
            3: 'Orthodontist', 
            4: 'Journalist'
        },
        correctAnswer: 3
    },
    {
        q: 'Ross is allergic to which kind of fruit?',
        a: {
            1: 'Lemon', 
            2: 'Apple', 
            3: 'Kiwi', 
            4: 'Orange'
        },
        correctAnswer: 3
    },
    {
        q: 'Phoebe has a twin sister. What is her name?',
        a: {
            1: 'Scarlett', 
            2: 'Ursula', 
            3: 'Sharon', 
            4: 'Rita'
        },
        correctAnswer: 2
    },
    {
        q: 'In which city is Friends set?',
        a: {
            1: 'New York City', 
            2: 'Los Angeles', 
            3: 'Miami', 
            4: 'Seattle'
        },
        correctAnswer: 1
    },
    {
        q: 'What is the name of the coffee shop used by the characters?',
        a: {
            1: `St James' Perk`, 
            2: 'Central Perk', 
            3: 'Daily Grind', 
            4: 'Coffee Here'
        },
        correctAnswer: 2
    },
    {
        q: 'What instrument does Phoebe Buffay play?',
        a: {
            1: `Drums`, 
            2: 'Flute', 
            3: 'Cello', 
            4: 'Guitar'
        },
        correctAnswer: 4
    },
    {
        q: `What is the name of Phoebe's alter-ego?`,
        a: {
            1: `Phoebe Neeby`, 
            2: 'Monica Bing', 
            3: 'Regina Falange', 
            4: 'Elaine Benes'
        },
        correctAnswer: 3
    },
    {
        q: `What kind of uniform does Joey wear to Monica and Chandler's wedding?`,
        a: {
            1: `Chef`, 
            2: 'Soldier', 
            3: 'Fire fighter', 
            4: 'Baseball player'
        },
        correctAnswer: 2
    },
    {
        q: `What is Janice most likely to say?`,
        a: {
            1: `Talk to the hand!`, 
            2: 'Get me a coffee!', 
            3: 'Oh... my... God!', 
            4: 'No way!'
        },
        correctAnswer: 3
    },
    {
        q: `What is Chandler's middle name?`,
        a: {
            1: `Muriel`, 
            2: 'Jason', 
            3: 'Kim', 
            4: 'Zachary'
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
        if (count <= 0 ) {
            clearInterval(timer);
            questions.setAttribute('class', 'hide');
            endScreen.removeAttribute('class', 'hide');
            finalScore.textContent = userInput.userScore;
            time.textContent = "Time's up! ⌛";
            feedback.textContent = '';
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
                    feedback.textContent = 'Correct! 🎉';
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
                    feedback.textContent = 'Wrong! 😿';
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


