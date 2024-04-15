const highscores = document.querySelector('#highscores');
const users = JSON.parse(localStorage.getItem('allUsers'));
const clear = document.querySelector('#clear');

if (users != null || users != undefined) {
    users.sort((a,b) => b.userScore - a.userScore);

    for (let i = 0; i < users.length; i++) {
        let addToRanking = document.createElement('li');
        addToRanking.textContent = users[i].userInitials + ' - ' + users[i].userScore;
        addToRanking.setAttribute('class', 'py-1 px-3');

        if (i % 2 === 0) {
            addToRanking.setAttribute('class', 'py-1 px-3 bg-purple-900'); 
        }

        highscores.appendChild(addToRanking);  
    }    
}

clear.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.clear();
    highscores.textContent = '';
})