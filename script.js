//Game Logic
const gameLogic = (()=>{
    let currentRound = 1;
    let runFunctions = false;
    
    const startGame = (state)=>{
        runFunctions = state;
        console.log('Start game is '+state)
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

        if(player1.myTurn === true){
            console.log('if player 1')
            player1.position = position;
            clickSpace(itemDOM, player1);
            player2.myTurn = true;
        }
        else if(player2.myTurn === true){
            console.log('else if player2')
            player2.position = position;
            clickSpace(itemDOM, player2);
            player1.myTurn = true;
        }
    }

    const clickSpace = (itemDOM, player)=>{
        console.log(itemDOM);
        console.log('current player sign: ' + player.sign)
        itemDOM.textContent = player.sign;
        player.myTurn = false;
        if(currentRound>=5){
            checkSpace(itemDOM, player);
        }
        
        if(player.won === true){
            gameOver(player);
            return;
        }
        else if (currentRound === 9 && !player.won){
            gameTie();
            gameOver(player);
            return;
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
            return checkRow(items, player, player.position, player.sign);
        }
        if(rowSpace()===true){
            return;
        }

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
            return checkColumn(items, player, player.position, player.sign);
        }
        if(columnSpace()===true){
            return;
        }

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
            return checkDiagonal(items, player, player.position, player.sign);
        }
        if(diagonalSpace()===true){
            return;
        }

        console.log(items)
    }

    const checkRow = (itemSpace, player, position, sign)=>{
        const siblingDOM = gameBoard.items;
        console.log('checkRow is run')

        if (itemSpace.left && itemSpace.right){
            if(siblingDOM[position-1].textContent===sign && siblingDOM[position+1].textContent===sign){
                return gameWon(player);
            }
        }

        else if (itemSpace.left){
            if(siblingDOM[position-1].textContent===sign && siblingDOM[position-2].textContent===sign){
                return gameWon(player);
            }
        }

        else if (itemSpace.right){
            if(siblingDOM[position+1].textContent===sign && siblingDOM[position+2].textContent===sign){
                return gameWon(player);
            }
        }
    }

    const checkColumn = (itemSpace, player, position, sign)=>{
        const siblingDOM = gameBoard.items;
        console.log('checkColumn is run')

        if (itemSpace.top && itemSpace.bottom){
            if(siblingDOM[position-3].textContent===sign && siblingDOM[position+3].textContent===sign){
                return gameWon(player);
            }
        }

        else if (itemSpace.top){
            if(siblingDOM[position-3].textContent===sign && siblingDOM[position-6].textContent===sign){
                return gameWon(player);
            }
        }

        else if (itemSpace.bottom){
            if(siblingDOM[position+3].textContent===sign && siblingDOM[position+6].textContent===sign){
                return gameWon(player);
            }
        }
    }
    
    const checkDiagonal = (itemSpace, player, position, sign)=>{
        const siblingDOM = gameBoard.items;
        console.log('diagonal sign: '+sign);
        console.log('checkDiagonal is run')

        if(itemSpace.diagonal1 && itemSpace.diagonal2){
            if((siblingDOM[position-4].textContent===sign && siblingDOM[position+4].textContent===sign)
            || (siblingDOM[position-2].textContent===sign && siblingDOM[position+2].textContent===sign)){
                return gameWon(player);
            }            
        }

        else if (itemSpace.diagonal1){
            if(itemSpace.top){
                if(siblingDOM[position-4].textContent===sign && siblingDOM[position-8].textContent===sign){
                    return gameWon(player);
                }
            }
            else if(itemSpace.bottom){
                if(siblingDOM[position+4].textContent===sign && siblingDOM[position+8].textContent===sign){
                    return gameWon(player);
                }
            }
        }

        else if (itemSpace.diagonal2){
            if(itemSpace.top){
                if(siblingDOM[position-2].textContent===sign && siblingDOM[position-4].textContent===sign){
                    return gameWon(player);
                }
            }
            else if(itemSpace.bottom){
                if(siblingDOM[position+2].textContent===sign && siblingDOM[position+4].textContent===sign){
                    return gameWon(player);
                }
            }            
        }
    }
    
    const gameWon = (player)=>{
        console.log(`congrats to ${player.name}`)
        return player.won = true;
    }

    const gameTie = ()=>{
        console.log('the game is a tie')
    }

    const gameOver = (player)=>{
        startGame(false);
        player.won = false;
        currentRound = 1;

        const restartButton = document.createElement('button');
        restartButton.textContent = 'RESTART';
        document.body.appendChild(restartButton).id = 'start-button';

        restartButton.addEventListener('click',()=>{
            gameBoard.items.forEach((element)=>{
                element.textContent = null;
            })

            document.body.appendChild(buttons.startButton);
            buttons.inputPlayer1.disabled = false;
            document.body.appendChild(buttons.inputPlayer1);
            buttons.inputPlayer2.disabled = false;
            document.body.appendChild(buttons.inputPlayer2);
            restartButton.remove();
        })

        
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
    
    let startButton = startDOM();

    const inputDOM = (num)=>{
        const textInput = document.createElement('input');
        textInput.placeholder = `Player ${num}`;
        document.body.appendChild(textInput).className = 'player-input';
        return textInput;
    }

    let inputPlayer1 = inputDOM(1);
    let inputPlayer2 = inputDOM(2);
    
    return {inputPlayer1, inputPlayer2, startButton}
})();

//Event Listeners
let player1;
buttons.inputPlayer1.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        console.log('player1 enter')
        console.log(buttons.inputPlayer1.value)
        buttons.inputPlayer1.disabled = true;
        player1 = Player(buttons.inputPlayer1.value, 'X', true);
    }
})

let player2;
buttons.inputPlayer2.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        console.log('player2 enter')
        console.log(buttons.inputPlayer2.value)
        buttons.inputPlayer2.disabled = true;
        player2 = Player(buttons.inputPlayer2.value, 'O', false);
    }
})

buttons.startButton.addEventListener('click', ()=>{
    if((typeof player1 !== 'object')||(typeof player2 !== 'object')){
        console.log(`Please enter a name`);
        return;
    }
    else{
        gameLogic.startGame(true);
        buttons.startButton.remove();
        buttons.inputPlayer1.remove();
        buttons.inputPlayer2.remove();        
    }
})