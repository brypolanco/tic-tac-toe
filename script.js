//Gameboard module
const gameBoard = (()=>{
    let items = [];

    const boardContainer = document.querySelector('#gameBoard');

    const buildBoard = (space)=>{
        for(let i = 0; i<space; i++){
            let boardRow = document.createElement('div')
            boardContainer.appendChild(boardRow).className='row';
            for(let j = 0; j<space; j++){
                let boardItem = document.createElement('div');
                boardRow.appendChild(boardItem).className='boardItem';
                items.push(boardItem);
            }
        }
    };
    const boardDOM = buildBoard(3);
    const getItems = ()=>{items};

    console.log(getItems);
})();


//Game Logic
const gameLogic = (()=>{
    const rounds = ()=>{

    }

    const chooseTurn = ()=>{

    }

    const spaceTaken = ()=>{

    }

    const checkRows = ()=>{

    }

})(player1, player2);


//Player factory function
const Player = (name, sign) =>{
    return {name, sign, position, myTurn};
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

    let player1 = Player('Player 1', 'X');
    let player2 = Player('Player 2', 'O');

    //Event Listeners
    startButton.addEventListener('click', ()=>{
        gameLogic(player1, player2);
    })


})();