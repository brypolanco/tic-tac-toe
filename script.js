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
const Player = (name, sign) =>{
    return {name, sign};
};

//UI Buttons module
const buttons = (()=>{
    //DOM elements
    const inputDOM = (player)=>{
        const inputArea = document.createElement('input');
        inputArea.placeholder = `Player ${player}`;
        document.body.appendChild(inputArea).id = `player${player}-input`;
        return inputArea;
    };

    const removeDOM = ()=>{
        if(player1 && player2){
            player1Area.remove();
            player2Area.remove();
            startDOM();
        }
    }

    const startDOM = ()=>{
        const startButton = document.createElement('button');
        startButton.textContent = 'START';
        document.body.appendChild(startButton).id = 'start-button';
    }

    const player1Area = inputDOM(1);
    const player2Area = inputDOM(2);


    //Event Listeners
    let player1 = player1Area.addEventListener('keypress', (e)=>{
        if (e.key === 'Enter') {
            player1 = Player(e.target.value, 'X');
            console.log(player1)
            removeDOM();
        }
    })

    let player2 = player2Area.addEventListener('keypress', (e)=>{
        if (e.key === 'Enter') {
            player2 = Player(e.target.value, 'O');
            console.log(player2)
            removeDOM();
        }
    })
})();