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
    
    const chooseTurn = (itemDOM, position)=>{
        if(runFunctions === false){
            console.log('Cant run. Press Start first.')
            return;
        }
        if(spaceTaken(itemDOM)){
            return;
        }
        if(buttons.player1.myTurn === true){
            console.log('if player 1')
            buttons.player1.position = position;
            clickSpace(itemDOM, buttons.player1);
            buttons.player2.myTurn = true;
        }
        else if(buttons.player2.myTurn === true){
            console.log('else if player2')
            buttons.player2.position = position;
            clickSpace(itemDOM, buttons.player2);
            buttons.player1.myTurn = true;
        }
    }

    const clickSpace = (itemDOM, player)=>{
        console.log(itemDOM);
        console.log('current player sign: ' + player.sign)
        itemDOM.textContent = player.sign;
        player.myTurn = false;

        checkSpace(itemDOM, player);
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

    const checkSpace = (itemDOM, sign)=>{
        let items = [];

        switch(itemDOM.className){
            case 'column1':
                items.left = false;
                items.right = true;
                checkRow(items, sign);
                break;
            case 'column2':
                items.left = true;
                items.right = true;
                checkRow(items, sign);
                break;
            case 'column3':
                items.left = true;
                items.right = false;
                checkRow(items, sign);
                break;
        }

        switch(itemDOM.className){
            case 'row1':
                items.top = false;
                items.bottom = true;
                checkColumn(items, sign);
                break;
            case 'row2':
                items.top = true;
                items.bottom = true;
                checkColumn(items, sign);
                break;
            case 'row3':
                items.top = true;
                items.bottom = false;
                checkColumn(items, sign);
                break;
        }

        switch(items){
            case (items.right && items.bottom) ||
            (items.left && items.top):
                items.diagonal1 = true;
                items.diagonal2 = false;
                checkDiagonal(items, sign);
                break;
            case items.top && items.bottom && items.left && items.right:
                items.diagonal1 = true;
                items.diagonal2 = true;
                checkDiagonal(items, sign);
                break;
            case (items.left && items.bottom) ||
            (items.right && items.top):
                items.diagonal1 = false;
                items.diagonal2 = true;
                checkDiagonal(items, sign);
                break;
        }
    }

    const checkRow = (itemSpace, sign)=>{
        const gameBoardDOM = gameBoard.items; 
        let itemsAround = checkSpaceAround(itemDOM);
        for(let row = 1; row<=3; row++){
            for(let col = 1; col<=3; col++){

            }
        }
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
            let position = items.findIndex((element)=>{
                return element === square;
            })
            console.log(`position is at items[${position}]`)
            gameLogic.chooseTurn(square, position)
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