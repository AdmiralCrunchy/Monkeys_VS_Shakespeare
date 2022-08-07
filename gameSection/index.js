const words = "This is a test set of words for the player to type out here, this is not the final set of words that we will be using in our game. There seems to be the need to have many more words that I initially speculated that we would need perhaps this was simply an oversight but maybe I'm just dumb and don't really know how to code things properly. This is a test set of words for the player to type out here, this is not the final set of words that we will be using in our game. There seems to be the need to have many more words that I initially speculated that we would need perhaps this was simply an oversight but maybe I'm just dumb and don't really know how to code things properly. This is a test set of words for the player to type out here, this is not the final set of words that we will be using in our game. There seems to be the need to have many more words that I initially speculated that we would need perhaps this was simply an oversight but maybe I'm just dumb and don't really know how to code things properly. This is a test set of words for the player to type out here, this is not the final set of words that we will be using in our game. There seems to be the need to have many more words that I initially speculated that we would need perhaps this was simply an oversight but maybe I'm just dumb and don't really know how to code things properly. This is a test set of words for the player to type out here, this is not the final set of words that we will be using in our game. There seems to be the need to have many more words that I initially speculated that we would need perhaps this was simply an oversight but maybe I'm just dumb and don't really know how to code things properly. This is a test set of words for the player to type out here, this is not the final set of words that we will be using in our game. There seems to be the need to have many more words that I initially speculated that we would need perhaps this was simply an oversight but maybe I'm just dumb and don't really know how to code things properly. Well this seems like the end of the road. It was nice riding with you partner I must type even more if I am able to.".split(' ');
const wordsCount = words.length;
const combatTime = 30 * 1000;
window.timer = null;
window.combatStart = null;
let madeError = null;

function addClass(el,name){

    el.className += ' '+name;
}

function removeClass(el,name){
    el.className = el.className.replace(name,'');
}

function randomWords() {
    const randomIndex = Math.ceil(Math.random() * wordsCount-1);
    return words[randomIndex];
}

function formatWord(word) {
    return `<div class="words"><span class="letter">${word.split('').join(`</span><span class="letter">`)}</span></div>`;
}

function initializeGame() {

    for (let i = 0; i < 100; i++) {
        const text = document.getElementById('wording');
        text.innerHTML += formatWord(randomWords());
    }
    addClass(document.querySelector('.words'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    window.timer = null;
}

function attackOver(){
    clearInterval(window.timer);
    addClass(document.getElementById('typingBoard'), 'over');
    document.getElementById('info').innerHTML = `WPM: ${getWPM()}` 
}

function getWPM(){
    const words = [...document.querySelectorAll('.words')];
    console.log('Words:',words);
    const lastTypedWord = document.querySelector('.words.current');
    console.log('Last Typed Word:',lastTypedWord);
    const LastTypedWordIndex = words.indexOf(lastTypedWord);
    console.log('Last Typed Word Index',LastTypedWordIndex);
    const typedWords = words.slice(0, LastTypedWordIndex);
    console.log('typed Words',typedWords);
    const correctWords = typedWords.filter(words => {
        const letters = [...words.children];
        console.log('Letters:', letters)
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'))
        const correctLetters = letters.filter(letter => letter.className.includes('correct'))
        console.log("The incorrect letters",incorrectLetters.length);
        console.log("Correct Letters:", correctLetters.length)
        console.log("letter length:", letters.length)


        return incorrectLetters.length === 0 && correctLetters.length === letters.length
    })
    console.log('Correct Words',correctWords);
    return correctWords.length / combatTime * 60000;
}

document.getElementById('typingBoard').addEventListener('keyup', event=>{
    const key = event.key;
    const currentWord = document.querySelector(".words.current");
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || " ";
    const isLetter = key.length === 1 && key !== ' ';
    const isSpaced = key === ' ';
    const isFirstLetter = currentLetter === currentWord.firstChild;
    const isExtra = document.querySelector('.letter.incorrect.extra');
    const isBackSpace = key === 'Backspace';

    if (document.querySelector('#typingBoard.over')){
        return;
    }
    console.log({key, expected});

    if(!window.timer && isLetter)
    {
        window.timer = setInterval(() =>{
            if (!window.combatStart) {
                window.combatStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.combatStart;
            const sPassed = Math.round(msPassed/1000);
            const sLeft = (combatTime/1000) - sPassed;
            document.getElementById('info').innerHTML = sLeft + '';
            if(sLeft <=0){
                attackOver()
                return;
            }
        }, 1000)
        
    }

    if(isLetter) {
        if(currentLetter){
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect');
            removeClass(currentLetter, 'current');
            if (currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }
            if(currentLetter.className === 'letter  incorrect'){
                madeError++
            }
        } else {
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className ='letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
            madeError++;
        }
    }
    if(isSpaced){
        if(expected !== ' ') {
            const lettersToInvalidate = [...document.querySelectorAll('.words.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect');
            })
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if(currentLetter){
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current')
    }
    if(isBackSpace) {
        if(currentLetter && isFirstLetter) {
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current');
            removeClass(currentWord.previousSibling.lastChild, 'correct');
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
        }
        if(currentLetter && !isFirstLetter) {

            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current');
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
        }
        if(!currentLetter) {
            addClass(currentWord.lastChild, 'current');
            removeClass(currentWord.lastChild, 'correct');
            removeClass(currentWord.lastChild, 'incorrect');
        }
        if(isExtra){
            currentWord.removeChild(isExtra);
        }

    }

    if(currentWord.getBoundingClientRect().top > 230) {
        const words = document.getElementById('wording')
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35)+ 'px';
    }

    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.words.current');
    const cursor = document.getElementById('cursor');
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top+[nextWord ? '0' : '2'] +'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] +'px';
})

initializeGame();