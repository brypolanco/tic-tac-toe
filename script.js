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

        if(currentRound>=2){
            if(spaceTaken(itemDOM)){
            return;
            }
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
        //change to currentRound>=5
        if(currentRound>=1){
            checkSpace(itemDOM, player);
        }
        
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

    const checkSpace = (itemDOM, player)=>{
        let items = [];
        let itemClass = itemDOM.classList;
        console.log('checkSpace is run')

        const rowSpace = ()=>{
            if(itemClass.contains('column1')){
                items.left = false;
                items.right = true;
            }
            if(itemClass.contains('column2')){
                items.left = true;
                items.right = true;
            }
            if(itemClass.contains('column3')){
                items.left = true;
                items.right = false;
            }
            checkRow(items, player);
        }
        rowSpace();

        const columnSpace = ()=>{
            if(itemClass.contains('row1')){
                items.top = false;
                items.bottom = true;
            }
            if(itemClass.contains('row2')){
                items.top = true;
                items.bottom = true;
            }
            if(itemClass.contains('row3')){
                items.top = true;
                items.bottom = false;
            }
            checkColumn(items, player);
        }
        columnSpace();

        const diagonalSpace = ()=>{
            if(items.top && items.bottom && items.left && items.right){
                items.diagonal1 = true;
                items.diagonal2 = true;
            }
            else if(!(itemClass.contains('column2')||itemClass.contains('row2'))){
                if((items.right && items.bottom) || (items.left && items.top)){
                    items.diagonal1 = true;
                    items.diagonal2 = false;
                }
                if((items.right && items.top) || (items.left && items.bottom)){
                    items.diagonal1 = false;
                    items.diagonal2 = true;
                }
            }
            checkDiagonal(items, player);
        }
        diagonalSpace();

        console.log(items)
    }

    const checkRow = (itemSpace, player)=>{
        const siblingDOM = gameBoard.items;
        const position = player.positon;
        console.log('checkRow is run')

        switch(itemSpace){
            case itemSpace.left && itemSpace.right:
                if(siblingDOM[position-1].textContent===player.sign && siblingDOM[position+1].textContent===player.sign){
                    gameWon(player);
                }
                break;
            case itemSpace.left:
                if(siblingDOM[position-1].textContent===player.sign && siblingDOM[position-2].textContent===player.sign){
                    gameWon(player);
                }
                break;
            case itemSpace.right:
                if(siblingDOM[position+1].textContent===player.sign && siblingDOM[position+2].textContent===player.sign){
                    gameWon(player);
                }
                break;
        }
    }

    const checkColumn = (itemSpace, player)=>{
        const siblingDOM = gameBoard.items;
        const position = player.positon;
        console.log('checkColumn is run')

        switch(itemSpace){
            case itemSpace.top && itemSpace.bottom:
                if(siblingDOM[position-3].textContent===player.sign && siblingDOM[position+3].textContent===player.sign){
                    gameWon(player);
                }
                break;
            case itemSpace.top:
                if(siblingDOM[position-3].textContent===player.sign && siblingDOM[position-6].textContent===player.sign){
                    gameWon(player);
                }
                break;
            case itemSpace.bottom:
                if(siblingDOM[position+3].textContent===player.sign && siblingDOM[position+6].textContent===player.sign){
                    gameWon(player);
                }
                break;
        }
    }
    
    const checkDiagonal = (itemSpace, player)=>{
        const siblingDOM = gameBoard.items;
        const position = player.positon;
        console.log('checkDiagonal is run')

        switch(itemSpace){
            case itemSpace.diagonal1 && itemSpace.diagonal2:
                if((siblingDOM[position-4].textContent===player.sign && siblingDOM[position+4].textContent===player.sign)
                || (siblingDOM[position-2].textContent===player.sign && siblingDOM[position+2].textContent===player.sign)){
                    gameWon(player);
                }
                break;
            case itemSpace.diagonal1:
                if(itemSpace.top){
                    if(siblingDOM[position-4].textContent===player.sign && siblingDOM[position-8].textContent===player.sign){
                        gameWon(player);
                    }
                }
                else if(itemSpace.bottom){
                    if(siblingDOM[position+4].textContent===player.sign && siblingDOM[position+8].textContent===player.sign){
                        gameWon(player);
                    }
                }
                break;
            case itemSpace.diagonal2:
                if(itemSpace.top){
                    if(siblingDOM[position-2].textContent===player.sign && siblingDOM[position-4].textContent===player.sign){
                        gameWon(player);
                    }
                }
                else if(itemSpace.bottom){
                    if(siblingDOM[position+2].textContent===player.sign && siblingDOM[position+4].textContent===player.sign){
                        gameWon(player);
                    }
                }
                break;
        }
    }
    
    const gameWon = (player)=>{
        console.log(`congrats to ${player.name}`)
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