/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, inputScores;

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function(){
    alert("GAME RULES: \n - The game has 2 players, playing in rounds \n - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score \n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn\n - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn \n- The first player to reach 50 points on GLOBAL score wins the game \n- A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.");
});

document.querySelector('.btn-scores').addEventListener('click', function(){
    inputScores = document.querySelector('.input-scores input').value;
    document.querySelector('.ion-ios-checkmark').style.display = 'none';
    document.querySelector('.input-scores input').disabled = true;
});

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        //1. Random number & previous dice
        var dice = Math.floor(Math.random() * 6) + 1;
        
        //2. Display the result
        document.querySelector('.dice').style.display = 'unset';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        //3. Update the round score if the num != 1
        if(dice === 1) {
            //3.5 Next Player
            nextPlayer();
        } else {            
            if ((dice === 6) && (previousDice === 6)) {
                scores[activePlayer] = 0; 
                document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];
                nextPlayer();
            } else {
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).innerHTML = roundScore;
                previousDice = dice;
            }
        } 
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        // Add Current scores to Global scores
        scores[activePlayer] += roundScore; 
        document.querySelector('#score-' + activePlayer).innerHTML = scores[activePlayer];

        //Win the game?
        if (scores[activePlayer] >= inputScores) {
            document.querySelector('#name-' + activePlayer).innerHTML = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false;
        } else {
        // set current to '0' and next player
            nextPlayer()
        }    
    }
        
});

function nextPlayer() {
    document.querySelector('#current-0').innerHTML = 0;
    document.querySelector('#current-1').innerHTML = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    /* document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');  */
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    previousDice = 0;
    inputScores = document.querySelector('.input-scores input').value;;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.ion-ios-checkmark').style.display = 'unset';
    document.querySelector('.input-scores input').disabled = false;
    document.querySelector('#score-0').innerHTML = 0;
    document.querySelector('#score-1').innerHTML = 0;
    document.querySelector('#current-0').innerHTML = 0;
    document.querySelector('#current-1').innerHTML = 0;

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-0').innerHTML = 'Player 1';
    document.querySelector('#name-1').innerHTML = 'Player 2';
};

