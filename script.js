//Gameboard module
const gameBoard = (()=>{
    let items = [];

    const boardContainer = document.querySelector('#gameBoard');

    const buildBoard = ()=>{
        for(let i = 0; i<3; i++){
            let boardRow = document.createElement('div')
            boardContainer.appendChild(boardRow).className='row';
            for(let j = 0; j<3; j++){
                let boardItem = document.createElement('div');
                boardRow.appendChild(boardItem).className='boardItem';
                items.push(boardItem);
            }
        }
    };

    return {buildBoard};
})();

gameBoard.buildBoard();

//Player factory function
const Player = () =>{
    const name = window.prompt('Enter player name');
    const sign = window.prompt('X or O?');
    return {name, sign};
};

//UI Buttons module
const buttons = (()=>{
    const inputDOM = (player)=>{
        const inputButton = document.createElement('input');
        inputButton.placeholder = `Player ${player}`;
        document.body.appendChild(inputButton).id = `player${player}-button`;
        return inputButton;
    };

    const player1Button = inputDOM(1);
    const player2Button = inputDOM(2);
})();