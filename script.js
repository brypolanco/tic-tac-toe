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
    buildBoard(3);
    console.log(items);
})();


//Player factory function
const Player = () =>{
    const name = window.prompt('Enter player name');
    const sign = window.prompt('X or O?');
    return {name, sign};
};

//UI Buttons module
const buttons = (()=>{
    const inputDOM = (player)=>{
        const inputArea = document.createElement('input');
        inputArea.placeholder = `Player ${player}`;
        document.body.appendChild(inputArea).id = `player${player}-button`;
        return inputArea;
    };

    const player1Button = inputDOM(1);
    const player2Button = inputDOM(2);
})();