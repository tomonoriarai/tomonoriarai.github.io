const keywords = [
    'about',
    'above',
    'add',
    'after',
    'again',
    'air',
    'all',
    'almost',
    'along',
    'also',
    'always',
    'America',
    'an',
    'and',
    'animal',
    'another',
    'answer',
    'any',
    'are',
    'around',
    'as',
    'ask',
    'at',
    'away',
    'back',
    'be',
    'because',
    'been',
    'before',
    'began',
    'begin',
    'being',
    'below',
    'between',
    'big',
    'book',
    'both',
    'boy',
    'but',
    'by',
    'call',
    'came',
    'can',
    'car',
    'carry',
    'change',
    'children',
    'city',
    'close',
    'come',
    'could',
    'country',
    'cut',
    'day',
    'did',
    'different',
    'do',
    'does',
    "don't",
    'down',
    'each',
    'earth',
    'eat',
    'end',
    'enough',
    'even',
    'every',
    'example',
    'eye',
    'face',
    'family',
    'far',
    'father',
    'feet',
    'few',
    'find',
    'first',
    'follow',
    'food',
    'for',
    'form',
    'found',
    'four',
    'from',
    'get',
    'girl',
    'give',
    'go',
    'good',
    'got',
    'great',
    'group',
    'grow',
    'had',
    'hand',
    'hard',
    'has',
    'have',
    'he',
    'head',
    'hear',
    'help',
    'her',
    'here',
    'high',
    'him',
    'his',
    'home',
    'house',
    'how',
    'idea',
    'if',
    'important',
    'in',
    'Indian',
    'into',
    'is',
    'it',
    'its',
    "it's",
    'just',
    'keep',
    'kind',
    'know',
    'land',
    'large',
    'last',
    'later',
    'learn',
    'leave',
    'left',
    'let',
    'letter',
    'life',
    'light',
    'like',
    'line',
    'list',
    'little',
    'live',
    'long',
    'look',
    'made',
    'make',
    'man',
    'many',
    'may',
    'me',
    'mean',
    'men',
    'might',
    'mile',
    'miss',
    'more',
    'most',
    'mother',
    'mountain',
    'move',
    'much',
    'must',
    'my',
    'name',
    'near',
    'need',
    'never',
    'new',
    'next',
    'night',
    'no',
    'not',
    'now',
    'number',
    'of',
    'off',
    'often',
    'oil',
    'old',
    'on',
    'once',
    'one',
    'only',
    'open',
    'or',
    'other',
    'our',
    'out',
    'over',
    'own',
    'page',
    'paper',
    'part',
    'people',
    'picture',
    'place',
    'plant',
    'play',
    'point',
    'put',
    'question',
    'quick',
    'quickly',
    'quite',
    'read',
    'really',
    'right',
    'river',
    'run',
    'said',
    'same',
    'saw',
    'say',
    'school',
    'sea',
    'second',
    'see',
    'seem',
    'sentence',
    'set',
    'she',
    'should',
    'show',
    'side',
    'small',
    'so',
    'some',
    'something',
    'sometimes',
    'song',
    'soon',
    'sound',
    'spell',
    'start',
    'state',
    'still',
    'stop',
    'story',
    'study',
    'such',
    'take',
    'talk',
    'tell',
    'than',
    'that',
    'the',
    'their',
    'them',
    'then',
    'there',
    'these',
    'they',
    'thing',
    'think',
    'this',
    'those',
    'thought',
    'three',
    'through',
    'time',
    'to',
    'together',
    'too',
    'took',
    'tree',
    'try',
    'turn',
    'two',
    'under',
    'until',
    'up',
    'us',
    'use',
    'very',
    'walk',
    'want',
    'was',
    'watch',
    'water',
    'way',
    'we',
    'well',
    'went',
    'were',
    'what',
    'when',
    'where',
    'which',
    'while',
    'white',
    'who',
    'why',
    'will',
    'with',
    'without',
    'word',
    'work',
    'world',
    'would',
    'write',
    'year',
    'you',
    'young',
    'your',
];

var timeSamples = [];

const game = document.getElementById("game");
const input = document.getElementById("input");

const cc = document.getElementById("pos");
const icc = document.getElementById("neg");
const spd = document.getElementById("spd");

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

    const lastN = timeSamples.slice(-10);
    var avg = lastN.length ? lastN.reduce((a, b) => a + b, 0) / lastN.length : -1;
    if ( avg != -1 ) {
        avg = avg / 1000;
        avg = Math.floor(avg * 10) / 10;
        spd.innerHTML = avg + "/key/sec";
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