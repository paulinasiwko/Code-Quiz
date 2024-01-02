const highscores = document.querySelector('#highscores');
const clear = document.querySelector('#clear');
const user = JSON.parse(localStorage.getItem('userInput'));

let allUsers = [];
allUsers.push(user);



for (let i = 0; i < allUsers.length; i++) {
    let addToRanking = document.createElement('li');
    addToRanking.textContent = allUsers[i].userInitials + ' - ' + allUsers[i].userScore;
    highscores.appendChild(addToRanking);  
}

