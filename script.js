//Game Logic
const gameLogic = ((player1, player2)=>{
    const rounds = ()=>{
        console.log('hi')
    }

    const chooseTurn = ()=>{

    }

    const clickSpace = ()=>{

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
        square.addEventListener('click', gameLogic.rounds)
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