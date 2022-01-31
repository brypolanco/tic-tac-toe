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
            }
        }
    };

    return {items};
})();

//Player factory function
const Player = (name, sign) =>{
    const getSign = sign;
    const getName = name;
};

