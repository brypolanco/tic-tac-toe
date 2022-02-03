//Game Logic
const gameLogic = (()=>{
    let currentRound = 0;
    const rounds = (itemDOM)=>{
        currentRound++;
        console.log('round '+currentRound)
        chooseTurn(itemDOM);
    }

    const chooseTurn = (itemDOM)=>{
        if(buttons.player1.myTurn === true){
            console.log('if player 1')
            clickSpace(itemDOM, buttons.player1);
            buttons.player2.myTurn = true;
        }
        else if(buttons.player2.myTurn === true){
            console.log('else if player2')
            clickSpace(itemDOM, buttons.player2);
            buttons.player1.myTurn = true;
        }
    }

    const clickSpace = (itemDOM, player)=>{
        console.log(itemDOM);
        console.log('current player sign: ' + player.sign)
        itemDOM.textContent = player.sign;
        player.myTurn = false;
    }

    const spaceTaken = ()=>{

    }

    const checkRows = ()=>{

    }

    return {rounds};

})();


//Gameboard module
const gameBoard = (()=>{
    let items = [];

    const boardContainer = document.querySelector('#gameBoard');

    const buildBoard = (space)=>{
        let row = 0;
        for(let i = 0; i<space; i++){
            row++;
            let col = 0;
            let boardRow = document.createElement('div')
            boardContainer.appendChild(boardRow).className='row';
            for(let j = 0; j<space; j++){
                col++;
                let boardItem = document.createElement('div');
                boardRow.appendChild(boardItem).className=`boardItem row${row} column${col}`;
                items.push(boardItem);
            }
        }
    };
    const boardDOM = buildBoard(3);

    items.forEach((square)=>{
        square.addEventListener('click', ()=>{
            gameLogic.rounds(square)
        })
    })
})();


//Player factory function
const Player = (name, sign, myTurn) =>{
    let position;
    return {name, sign, myTurn, position};
};

//UI Buttons module
const buttons = (()=>{
    //DOM elements
    const startDOM = ()=>{
        const startButton = document.createElement('button');
        startButton.textContent = 'START';
        document.body.appendChild(startButton).id = 'start-button';
        return startButton;
    }
    
    const startButton = startDOM();

    let player1 = Player('Player 1', 'X', true);
    let player2 = Player('Player 2', 'O', false);

    //Event Listeners
    startButton.addEventListener('click', ()=>{
        gameLogic;
    })

    return {player1, player2}
})();