//Globala variabler:
let randomNumber = Math.ceil(Math.random() * 3);
console.log(randomNumber);
let amountWon = 0;
let amountLost = 0;
let namn;
baseUrl = "https://js2-miniprojekt1-9f071-default-rtdb.europe-west1.firebasedatabase.app/";

//Variabler + eventlistener angående namn funktion:
const btnNamn = document.querySelector('#name-btn');
btnNamn.addEventListener('click', pName);
let h3 = document.querySelector('h3');

//Funktion för spelarens namn:
function pName(event) {
    event.preventDefault();

    const inputNamn = document.querySelector('#name-input');
    namn = inputNamn.value;

    h3.innerText = `0 (${namn}) - 0 (CPU)`;

    inputNamn.value = '';
}

//Hämtar knapparna i en container och aktiverar deras funktion:
const runda = document.querySelector('#round-p');
const spel = document.querySelector('#btn-container');
spel.addEventListener('click', spelVal);

//Funktionen som är spelet:
function spelVal(event) {
    if (event.target.tagName == 'BUTTON') {
        const plays = document.querySelector('h2');

        //If-case för spelet:
        if (event.target.innerText === "Rock") {
            if (randomNumber == 1) {
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "It was even, go again";
                randomNumber = Math.ceil(Math.random() * 3);

                plays.innerText = "Rock vs Rock";
            }
            else if (randomNumber == 2) {
                amountWon++;
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "You won";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Rock vs Scissor";
            }
            else {
                amountLost++;
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "You lost";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Rock vs Paper";
            }
        }

        else if (event.target.innerText === "Scissor") {
            if (randomNumber == 1) {
                amountLost++;
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "You lost";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Scissor vs Rock";
            }
            else if (randomNumber == 2) {
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "It was even, go again";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Scissor vs Scissor";
            }
            else {
                amountWon++;
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "You won";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Scissor vs Paper";
            }
        }

        else {
            if (randomNumber == 1) {
                amountWon++;
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "You won";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Paper vs Rock";
            }
            else if (randomNumber == 2) {
                amountLost++;
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "You lost";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Paper vs Scissor";
            }
            else {
                h3.innerText = `${amountWon} (${namn}) - ${amountLost} (CPU)`;
                runda.innerText = "It was even, go again";
                randomNumber = Math.ceil(Math.random() * 3);
                plays.innerText = "Paper vs Paper";
            }
        }
    }
}

let saveScore = document.querySelector("#score-btn");
saveScore.addEventListener("click", scorebtn);

function scorebtn() {
    let totalScore = amountWon - amountLost;
    const score = {
        name: `${namn}`,
        score: totalScore
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
    const arr = Object.values(data);

    const existingElements = document.querySelectorAll('h1');
    existingElements.forEach(element => element.remove());

    for (let i = 0; i < arr.length; i++) {
        const divs = document.createElement("div");
        document.querySelector("#score-container").append(divs);

        const name = document.createElement('h3');
        name.innerText = arr[i].name;
        divs.append(name)

        const score = document.createElement('h1');
        score.innerText = arr[i].score;
        divs.append(score);
    }
}

const reset = document.querySelector('#reset-btn');
reset.addEventListener('click', resetbtn);

function resetbtn() {
    namn = "";
    h3.innerText = "0 (You) - 0 (CPU)";
    amountWon = 0;
    amountLost = 0;
    runda.innerText = "Waiting on plater input...";
    spel.addEventListener('click', spelVal);
}
