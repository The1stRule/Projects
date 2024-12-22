const scores = document.getElementsByTagName('span');
const result = document.getElementById('result');
const mainArray = ['Rock', 'Paper', 'Scissors'];
const imgArray = ['./images/rock.png', './images/paper.png', './images/scissor.png'];
const resImg = document.getElementById('chois-result').children;

function presentational(res, usScore, pcScore) {
    result.textContent = res;
    let number = scores[usScore].textContent;
    scores[usScore].textContent = Number(number) + 1;

    number = scores[pcScore].textContent;
    scores[pcScore].textContent = Number(number) + 1;

}

function container(chois, index) {
    const choisNumber = random();
    const pcChois = mainArray[choisNumber];
    
    resImg[0].src = imgArray[index];
    resImg[2].src = imgArray[choisNumber];


    let res;
    let usScore;
    let pcScore;

    if(chois === 'Rock' && pcChois === 'Scissors' ||
        chois === 'Scissors' && pcChois === 'Paper' || 
        chois === 'Paper' && pcChois === 'Rock') {
        res = 'You Win!';
        usScore = 0;
        pcScore = 4;
    } else if(chois === pcChois) {
        res = 'Draw!';
        usScore = 2;
        pcScore = 5;
    } else {
        res = 'You Lose';
        usScore = 1;
        pcScore = 3;
    }
    console.log(chois, pcChois);
    presentational(res, usScore, pcScore);
}

function random() {
    const random = Math.floor(Math.random() * 3);
    return random;
}