var timeSamples = [];

const game = document.getElementById("game");
const input = document.getElementById("input");

const cc = document.getElementById("pos");
const icc = document.getElementById("neg");
const spd = document.getElementById("spd");
const acy = document.getElementById("acy");
const rate = document.getElementById("rate");

const set1 = document.getElementById("set1");
const set2 = document.getElementById("set2");

var correctCount = 0;
var incorrectCount = 0;

function addWord() {
    var word = document.createElement("p");
    word.innerText = getRandomWord();
    game.appendChild(word);
}

function gameControl() {
    cc.innerText = correctCount;
    icc.innerText = incorrectCount;
    
    var accuracyPercent = correctCount / (correctCount + incorrectCount) * 100;
    if ( !isNaN(accuracyPercent) ) acy.innerText = Math.floor(accuracyPercent * 10) / 10;

    const lastN = timeSamples.slice(-10);
    var avg = lastN.length ? lastN.reduce((a, b) => a + b, 0) / lastN.length : -1;
    if ( avg != -1 ) {
        avg = avg / 1000;
        avg = Math.floor(avg * 10) / 10;
        spd.innerText = avg + "sec /key";
        rate.innerText = getTypingRating(accuracyPercent, avg);
    }

    while ( game.children.length < 5 ) {
        addWord();
    }

    document.querySelectorAll(".typing").forEach(i => { i.classList = ""; });
    var typing = game.children[0];
    typing.classList = "typing";
    input.setAttribute("typingWord", typing.innerText);
    input.placeholder = typing.innerText;
}

var startTyping = -1;

window.onload = function() {
    input.onkeydown = function (event) {
        if ( !set2.checked ) return;

        if (event.key === "Enter") {
            handleGamer(this);
        }
    }

    input.oninput = function () {
        if ( startTyping == -1 ) startTyping = Date.now();

        if ( !set1.checked ) {
            this.value = this.value.replaceAll(" ", "");
            return;
        }
        if ( !this.value.endsWith(" ") ) return;

       handleGamer(this);
    }
    
    setInterval(function() {
        gameControl();
    }, 50);
}

function handleGamer(iEl) {
    var iValue = iEl.value;
    iValue = iValue.replaceAll(" ", "");
    if ( iValue == "" ) {
        iEl.value = "";
        return;
    }

    iEl.value = iValue;


    const wordToType = iEl.getAttribute("typingWord");

    if ( iValue  == wordToType ) {
        game.children[0].remove();
        iEl.value = "";

        correctCount++;

        var timeTake = Date.now() - startTyping;
        startTyping = -1;

        var timeTakePerKey = timeTake / wordToType.length;
        timeSamples.push(timeTakePerKey);
    } else {
        incorrectCount++;
    }
}

function getRandomWord() {
    return keywords[Math.floor(Math.random()*keywords.length)];
}

var isRunningCheat = false;

function cheat() {

    isRunningCheat = !isRunningCheat;

    let i = 0;

    let randDelay = () => Math.floor(Math.random() * (250 - 80 + 1)) + 80;

    let typeWord = () => {
        input.focus();
        let word = input.getAttribute("typingWord");
        if (i <= word.length) {
            input.value = word.slice(0, i);
            input.dispatchEvent(new Event("input"));
            i++;
        } else {
            input.value = word + " ";
            input.dispatchEvent(new Event("input"));
            i = 0;
            if(isRunningCheat) setTimeout(typeWord, randDelay);
            return;
        }
        setTimeout(typeWord, randDelay);
    };
    
    if(isRunningCheat) typeWord();
    
}



function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

function getTypingRating(accuracyPercent, secPerKey) {
    const accuracyScore = clamp(((accuracyPercent - 85) / 15) * 10, 0, 10);
    const speedScore = clamp(((0.5 - secPerKey) / 0.4) * 10, 0, 10);
    const finalRating = (accuracyScore + speedScore) / 2;
    return +finalRating.toFixed(2);
}
  