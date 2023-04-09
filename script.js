let randomNumber = Math.ceil(Math.random() * 3);
console.log(randomNumber);
let amountWon = 0;
let namn;
baseUrl = "https://js2-miniprojekt1-9f071-default-rtdb.europe-west1.firebasedatabase.app/";

const btnNamn = document.querySelector('#name-btn');
btnNamn.addEventListener('click', pName);
let h3 = document.querySelector('h3');

function pName(event) {
    event.preventDefault();

    const inputNamn = document.querySelector('#name-input');
    namn = inputNamn.value;

    h3.innerText = `0 points (${namn})`;

    inputNamn.value = '';
}

const runda = document.querySelector('#round-p');
const spel = document.querySelector('#btn-container');
spel.addEventListener('click', spelVal);

//Funktionen som är spelet:
function spelVal(event) {
    if (event.target.tagName == 'BUTTON') {
        const plays = document.querySelector('h2');

        if (event.target.innerText === "Rock") {
            if (randomNumber == 1) {
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "It was even, go again";
                randomNumber = Math.ceil(Math.random() * 3);

                plays.innerText = "Rock vs Rock";
            }
            else if (randomNumber == 2) {
                amountWon++;
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "You won";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Rock vs Scissor";
            }
            else {
                amountWon = 0;
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "You lost";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Rock vs Paper";
            }
        }

        else if (event.target.innerText === "Scissor") {
            if (randomNumber == 1) {
                amountWon = 0;
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "You lost";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Scissor vs Rock";
            }
            else if (randomNumber == 2) {
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "It was even, go again";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Scissor vs Scissor";
            }
            else {
                amountWon++;
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "You won";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Scissor vs Paper";
            }
        }

        else {
            if (randomNumber == 1) {
                amountWon++;
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "You won";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Paper vs Rock";
            }
            else if (randomNumber == 2) {
                amountWon = 0;
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "You lost";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Paper vs Scissor";
            }
            else {
                h3.innerText = `${amountWon} points (${namn})`;
                runda.innerText = "It was even, go again";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Paper vs Paper";
            }
        }
    }
}

const scoreContainer = document.querySelector("#score-container");

window.addEventListener('load', async () => {
    const response = await fetch(baseUrl + 'scores.json');
    const data = await response.json();

    displayScores(data);
});

const saveScore = document.querySelector("#score-btn");
saveScore.addEventListener("click", scorebtn);

function scorebtn() {
    const score = {
        name: `${namn}`,
        score: amountWon
    }
    putScore(score);
}

async function putScore(obj) {
    const newurl = baseUrl + 'scores.json';

    const response = await fetch(newurl);
    const data = await response.json();

    let arr = Object.values(data);
    arr.push(obj);

    arr.sort((a, b) => b.score - a.score);
    arr = arr.slice(0, 5);

    await fetch(newurl, {
        method: 'PUT',
        body: JSON.stringify(arr),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    displayScores(arr);
}

async function displayScores(data) {
    scoreContainer.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const div = document.createElement("div");

        const name = document.createElement('h3');
        name.innerText = data[i].name;
        div.appendChild(name);

        const score = document.createElement('h1');
        score.innerText = data[i].score;
        div.appendChild(score);

        scoreContainer.appendChild(div);
    }
}

const reset = document.querySelector('#reset-btn');
reset.addEventListener('click', resetbtn);

function resetbtn() {
    namn = "";
    h3.innerText = "0 points (You)";
    amountWon = 0;
    runda.innerText = "Waiting on plater input...";
    spel.addEventListener('click', spelVal);
}
