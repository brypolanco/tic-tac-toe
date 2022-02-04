//Game Logic
const gameLogic = (()=>{
    let currentRound = 1;
    let runFunctions = false;
    
    const startGame = (state)=>{
        runFunctions = state;
        console.log('Start game')
    }

    const rounds = ()=>{
        currentRound++;
        console.log('round '+currentRound)
    }
    
    const chooseTurn = (itemDOM)=>{
        if(runFunctions === false){
            console.log('Cant run. Press Start first.')
            return;
        }
        if(spaceTaken(itemDOM)){
            return;
        }
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

        checkRows(itemDOM, player.sign);
        rounds();
    }

    const spaceTaken = (itemDOM)=>{
        if(itemDOM.textContent){
            console.log('space is taken')
            return true;
        }
        else{
            console.log('space is empty')
            return false;
        }
    }

    const checkRows = (itemDOM, sign)=>{
        const gameBoardDOM = gameBoard.items; 
        let itemsAround = checkSpaceAround(itemDOM);
        for(let row = 1; row<=3; row++){
            for(let col = 1; col<=3; col++){

            }
        }
    }

    const checkSpaceAround = (itemDOM)=>{


        switch(itemDOM.className){
            case 'column1':
                //no item on left
                break;
            case 'column2':
                //items on left and right
                break;
            case 'column3':
                //no item on right
                break;
        }
        switch(itemDOM.className){
            case 'row1':
                //no item on top
                break;
            case 'row2':
                //items on top and bottom
                break;
            case 'row3':
                //no item on bottom
                break;
        }

        /*
        if (itemDOM has itemsRight and itemsbottom 
            or itemsTop and itemsRight or itemsleft and itemsbottom 
            or itemsleft and itemstop or itemstop and itemsbottom and 
            itemsleft and items right){
                has items diagonally
            }
        */
    }


    return {startGame, chooseTurn};

})();


//Gameboard module
const gameBoard = (()=>{
    let items = [];

    const boardContainer = document.querySelector('#gameBoard');

    const buildBoard = ()=>{
        for(let row = 1; row<=3; row++){
            let boardRow = document.createElement('div')
            boardContainer.appendChild(boardRow).className='row';
            for(let col = 1; col<=3; col++){
                let boardItem = document.createElement('div');
                boardRow.appendChild(boardItem).className=`boardItem row${row} column${col}`;
                items.push(boardItem);
            }
        }
    };
    buildBoard();

    items.forEach((square)=>{
        square.addEventListener('click', ()=>{
            gameLogic.chooseTurn(square)
        })
    })
    return {items}
})();


//Player factory function
const Player = (name, sign, myTurn) =>{
    let position;
    return {name, sign, myTurn, position};
};

//UI Buttons module
const buttons = (()=>{
    const startDOM = ()=>{
        const startButton = document.createElement('button');
        startButton.textContent = 'START';
        document.body.appendChild(startButton).id = 'start-button';
        return startButton;
    }
    
    const startButton = startDOM();

    let player1 = Player('Player 1', 'X', true);
    let player2 = Player('Player 2', 'O', false);

    startButton.addEventListener('click', ()=>{
        gameLogic.startGame(true);
    })
    return {player1, player2}
})();