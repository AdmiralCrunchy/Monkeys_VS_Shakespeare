//Combat Vairables
const playerName = "Bobo"
window.globalTimer = null;
let actionName = null;
let actionTarget = null;
let menuRan = null;
let playerCharacter= null;

class Ape {
constructor(name, level, max_Health, health_Points, attack_Speed, attack_Damage, special_Points, role) {
        this.name = name;
        this.level = level;
        this.max_Health = max_Health;
        this.health_Points = health_Points;
        this.attack_Speed = attack_Speed;
        this.attack_Damage = attack_Damage;
        this.special_Points = special_Points;
        this.role = role;
        this.is_Ape = true;
    }
    isAlive()
    {
        if(this.health_Points <=0){
            console.log("they died")
            document.getElementById(`combatLog`).innerHTML = `${this.name} has died! <br> May they live forever in monkey Valhalla!`
            return false;
        }
        return true;
    }
}

class Enemy {
    constructor(name,max_Health, health_Points, attack_Speed, attack_Damage){
        this.name = name;
        this.max_Health = max_Health;
        this.health_Points = health_Points;
        this.attack_Speed = attack_Speed;
        this.attack_Damage = attack_Damage;
        this.is_Ape = false;
    }
    isAlive()
    {
        if(this.health_Points <=0){
            document.getElementById(`combatLog`).innerHTML = `${this.name} has died their second death!`
            this.health_Points = 0;
            return false;
        }
        return true;
    }
}

const Jeff = new Ape('Jeff', 5, 100, 100, 15000, 7, 5, 'DPS');
const Dipper = new Ape('Dipper', 5, 100, 100, 25000, , 5, 'tank');
const Bobo = new Ape('Bobo', 5, 100, 100, 26000, 10, 5, 'healer');
const Angela = new Ape('Angela', 5, 100, 100, 22000, 10, 5, 'wizard');


const BadGuy1 = new Enemy('William S.', 100, 100, 15000, 10);
const BadGuy2 = new Enemy('Oscar Wilde', 100, 100, 20000, 8);
const BadGuy3 = new Enemy('Mary Shelly', 100, 100, 30000, 20);

const combatants = {
    monkeys: [Jeff, Dipper, Bobo, Angela],
    enemies: [BadGuy1, BadGuy2, BadGuy3]
};

enemyAttackSpeed = 15000;

//Keyboard Variables

const wordPool = `Verona was coming to life: people poured out of the houses and filled the streets while market traders set up their stalls in the grand piazza. It was a good patch, an excellent place to catch the business of those who lived and worked in the rich houses that lined Verona’s main square. The Capulet mansion was one of the biggest filled with servants and humming with activity. It was an hour till breakfast and while the cooks sweated over the fires in the kitchen, conjuring mouthwatering aromas of baked breads and hams, the servingmen killed time as best they could. Two of them hot, bored and restless stepped out into the bustle of the piazza and swaggered about among the bright colours, the animal smells and the din of traders’ voices, hoping to find some action.`.split(' ');
const wordsCount = wordPool.length;
let combatTime = 30 * 1000;
window.timer = null;
window.combatStart = null;
let madeError = null;
let finishedEarly = null;
let combatTimeLeft = null;

//-----------------------------------------------------//
//-                                                   -//
//-                                                   -//
//-               Keyboard section                    -//
//-                                                   -//
//-                                                   -//
//-----------------------------------------------------//

function addClass(el,name){
    if(!el)
    {
        finishedEarly = true;
        attackOver();
        return;
    }
    el.className += ' '+name;
}

function removeClass(el,name){
    el.className = el.className.replace(name,'');
}

function randomWords() {
    const randomIndex = Math.ceil(Math.random() * wordsCount-1);
    return wordPool[randomIndex];
}

function formatWord(word) {
    return `<div class="words"><span class="letter">${word.split('').join(`</span><span class="letter">`)}</span></div>`;
}

function initializeKeyboard(mode) {
    window.timer = null;
    madeError = null;
    combatTimeLeft = null;
    finishedEarly = null;
    window.combatStart = null;

    removeClass(document.getElementById('typingBoard'), 'over');

    document.getElementById('combatLog').innerHTML = "GET TYPING!!!"
    let init = document.getElementById('typingBoard');
    init.innerHTML = `<div id="wording"></div>
    <div id="cursor"></div>
    <div id="focus-error">Click here to get back into the action!</div>`
    finishedEarly = null;

    const cursor = document.getElementById('cursor');
    const board = document.getElementById('typingBoard');

    switch(mode){
        case 'attack':
            for(let i = 0; i <= wordsCount-1; i++)
            {
                const v = i;
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(wordPool[v])
            }
            break;
        case 'defend':
            for (let i = 0; i < 100; i++) {
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(randomWords());
            }
            combatTime = 60000;
            break;
        case 'heal':
            for (let i = 0; i < 15; i++) {
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(randomWords());
            }
            combatTime = 15000;
            break;
        case 'buff' :
            for (let i = 0; i < 15; i++) {
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(randomWords());
            }
            combatTime = 15000;
            break;
        case 'debuff' :
            for (let i = 0; i < 15; i++) {
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(randomWords());
            }
            combatTime = 15000;
            break;

        default:
            break;
    }

    addClass(document.querySelector('.words'), 'current');
    addClass(document.querySelector('.letter'), 'current');

    cursor.style.top = board.getBoundingClientRect().top+2+'px' ;
    cursor.style.left = board.getBoundingClientRect().left+'px';
   
}

function attackOver(){
    clearInterval(window.timer);
    addClass(document.getElementById('typingBoard'), 'over');
    getScore();
    combatMenu();
}

function getScore(){
    let wpmScore = null;
    let totalDone = null;
    let accScore = null;
    let totalIncorrectLetters = null;
    let totalCorrectLetters = null;
    let totalLetters = null;

    const words = [...document.querySelectorAll('.words')];
    const lastTypedWord = document.querySelector('.words.current');
    const LastTypedWordIndex = words.indexOf(lastTypedWord);
    const typedWords = words.slice(0, LastTypedWordIndex);
    const correctWords = typedWords.filter(words => {
        const letters = [...words.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'))
        const correctLetters = letters.filter(letter => letter.className.includes('correct'))
        if(incorrectLetters.length>0){
            totalIncorrectLetters += (incorrectLetters.length+1);
        }
        if(correctLetters.length>0){
            totalCorrectLetters += (correctLetters.length+1);
        }
        if(letters.length>0){
            totalLetters +=(letters.length+1);
        }
        
        return incorrectLetters.length === 0 && correctLetters.length === letters.length
    })

    if(finishedEarly)
    {
        wpmScore = Math.floor(correctWords.length / ((combatTime/1000) - combatTimeLeft) * 60); 
    }else{
        wpmScore = Math.floor(correctWords.length / combatTime * 60000);
    }

    accScore = Math.floor(100*(((totalCorrectLetters) - ((totalIncorrectLetters) + madeError)) / (totalLetters)))
    if(accScore < 0)
    {
        accScore = 0;
    }

    totalDone = Math.floor(100*((correctWords.length+1) / (words.length)))

    document.getElementById('combatLog').innerHTML = `${playerName} ${actionName}ed ${actionTarget} <br> STATS WPM: ${wpmScore} Accuracy: ${accScore}% Percentage Finished: ${totalDone}%`

    removeKeyboard();
    actionLand(wpmScore, accScore, totalDone);
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
    const isExtra2 = document.querySelector('.letter.extra');
    const isBackSpace = key === 'Backspace';
    const isFirstWord = currentWord === wording.firstChild;

    if (document.querySelector('#typingBoard.over')){
        return;
    }

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
            combatTimeLeft = sLeft;
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
            if(isFirstWord)
            {
                return
            }
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current');
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
            removeClass(currentWord.previousSibling.lastChild, 'correct');

        }
        if(currentLetter && !isFirstLetter) {

            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current');
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
        }
        if(!currentLetter) {
            addClass(currentWord.lastChild, 'current');
            removeClass(currentWord.lastChild, 'incorrect');
            removeClass(currentWord.lastChild, 'correct');

        }
        if(isExtra || isExtra2){
            currentWord.removeChild(isExtra);
        }
        
    }

    if(currentWord.getBoundingClientRect().top > 395) {
        const words = document.getElementById('wording')
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35)+ 'px';
    }

    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.words.current');
    const cursor = document.getElementById('cursor');

    cursor.style.top = ((nextLetter || nextWord).getBoundingClientRect().top+[nextWord ? '0' : '2']) +'px' ;
    cursor.style.left = ((nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right']) +'px';

})

function removeKeyboard() {
    let keyboard = document.getElementById('typingBoard')
    keyboard.innerHTML = null;
}


//-----------------------------------------------------//
//-                                                   -//
//-                                                   -//
//-                 Combat section                    -//
//-                                                   -//
//-                                                   -//
//-----------------------------------------------------//

function chooseApe(){
    document.getElementById('combatLog').innerHTML = 'Choose Your Monkey';
    document.getElementById('typingBoard').innerHTML = ' ';
    for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            let menu = document.getElementById('typingBoard');
            menu.innerHTML += makeButton(combatants.monkeys[x].name, 'choose');
        }
    for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            document.getElementById(`${combatants.monkeys[x].name}chooseButton`).addEventListener('click', event =>{
                playerCharacter = combatants.monkeys[x]
                playerCharacter.name = 'Player';
                combatants.monkeys[x] = playerCharacter;
                clearButtons();
                initializeCombat();
            })
        }
}

function getTarget(unit){
    console.log(unit.name)

    if(unit.is_Ape)
    {
        console.log("monkey is attacking!")
        const randomIndex = Math.ceil(Math.random() * combatants.enemies.length-1);

        return combatants.enemies[randomIndex]
    }
    else{
        const randomIndex = Math.ceil(Math.random() * combatants.monkeys.length-1);

        return combatants.monkeys[randomIndex]
    }
    
}

function attackClock(unit) {

    window.unit = setInterval(() =>{
        attackTarget(unit,getTarget(unit));
        window.unit++;
    }, unit.attack_Speed)
}

function attackTarget(attacker, target) {
    
    if(target.isAlive() == true)
    {
        target.health_Points = target.health_Points - attacker.attack_Damage
        document.getElementById('combatLog').innerHTML = `${attacker.name} has attacked ${target.name}! <br> They have ${target.health_Points} HP Left!`
    }
    else{
        document.getElementById('combatLog').innerHTML = `${attacker.name} has attacked ${target.name}! <br> OH THE HUMANITY`
    }
}

function combatMenu(){

    let menu = document.getElementById('typingBoard');
    menu.innerHTML = `<button id="attackButton">ATTACK</button><button id="defendButton">DEFEND</button><button id="healButton">HEAL</button><button id="specialButton">SPECIAL</button>`;
    
        document.getElementById('attackButton').addEventListener('click', event=>{
            actionName = 'attack';
            clearButtons();
            setupAttack();
        })
        
        document.getElementById('defendButton').addEventListener('click', event=>{
            actionName = 'defend';
            clearButtons();
            setupDefend();
        })
        
        document.getElementById('healButton').addEventListener('click', event=>{
            actionName = 'heal';
            clearButtons();
            setupHeal();
        })
        
        document.getElementById('specialButton').addEventListener('click', event=>{
            actionName = 'special';
            clearButtons();
            setupSpecial();
        })
}

function initializeCombat(){    
    setupAllies();
    createEnemies();
    populateViewport();
    combatMenu();
}



function clearLog(){
    document.getElementById('combatLog').innerHTML = ' ';
}

function clearButtons(){
    let e = document.querySelector('button');
    e.parentElement.removeChild;
    let menu = document.getElementById('typingBoard');
    menu.innerHTML = " ";
}

//------------------------------//
//-                            -//
//        Menu Chioces          //
//-                            -//
//------------------------------//


function setupAttack(){
    //pick enemy
    let log = document.getElementById(`combatLog`)
    log.innerHTML = "Who are you attacking?"

    for(let i = 0; i < combatants.enemies.length; i++ )
    {
        const x = i;
        let menu = document.getElementById('typingBoard');
        menu.innerHTML += makeButton(combatants.enemies[x].name, 'attack');
        
    }
    backButton();
    for(let i = 0; i < combatants.enemies.length; i++ )
    {
        const x = i;
        createEventListen(combatants.enemies[x].name, 'attack');
    }

    
}
function setupDefend(){
    //pick ally or self
    
    document.getElementById(`combatLog`).innerHTML = "Who will you defend?"
    let player = combatants.monkeys.find(element => element.name == 'Player')

    if(player.role == 'tank')
    {
        
        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            let menu = document.getElementById('typingBoard');
            menu.innerHTML += makeButton(combatants.monkeys[x].name, 'defend');

        }
        backButton();
        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            createEventListen(combatants.monkeys[x].name, 'defend');
        }  
    }
    else{
        document.getElementById('combatLog').innerHTML = "Defending Self!";
        initializeKeyboard(actionName);
    }
}
function setupHeal(){
    //pick ally or self
    
    let player = combatants.monkeys.find(element => element.name == 'Player')

    if(player.role == 'healer')
    {
        document.getElementById(`combatLog`).innerHTML = "Who will you heal?"

        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            let menu = document.getElementById('typingBoard');
            menu.innerHTML += makeButton(combatants.monkeys[x].name, 'heal');
            
        }
        backButton()
        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            createEventListen(combatants.monkeys[x].name, 'heal');
        }     
    }
    else{
        
        document.getElementById('combatLog').innerHTML = "Casting a healing Spell!";

        initializeKeyboard(actionName);
    }  
    
}

function createEventListen(name, action){
    document.getElementById(`${name}${action}Button`).addEventListener('click', event =>{
        event.preventDefault();
        actionTarget = name;
        clearButtons();
        initializeKeyboard(actionName);
    })
}

function enemyAttack(){
    
}

function actionLand(wpm, acc, total){

    switch (actionName) {
        case 'attack':
            
            break;
        case 'defend':
            
            break;
        case 'heal':
            
            break;
        case 'buff':
            
            break;
        case 'debuff':
            
            break;
    
        default:
            break;
    }

    actionName = null;
    combatMenu()
}

function makeButton(name, action){
    return `<button id='${name}${action}Button'>${name}</button>`
}


function setupSpecial(){
    
    let menu = document.getElementById('typingBoard');
    menu.innerHTML += makeButton('buff', 'Allies');
    menu.innerHTML += makeButton('debuff','Enemies')
    backButton();
    document.getElementById(`buffAlliesButton`).addEventListener('click', event =>{
        clearButtons();
        setupBuff();
    })
    document.getElementById(`debuffEnemiesButton`).addEventListener('click', event =>{
        
        clearButtons();
        setupDebuff();
    })
    
}

function setupDebuff(){
    document.getElementById(`combatLog`).innerHTML = "Who will you debuff?"

    for(let i = 0; i < combatants.enemies.length; i++ )
    {
        const x = i;
        let menu = document.getElementById('typingBoard');
        menu.innerHTML += makeButton(combatants.enemies[x].name, 'debuff');
    }
    backButton();
    for(let i = 0; i < combatants.enemies.length; i++ )
    {
        const x = i;
        createEventListen(combatants.enemies[x].name, 'debuff');
    }
    actionName = 'debuff';
}

function setupBuff(){
    //pick ally, self or enemy
        document.getElementById(`combatLog`).innerHTML = "Who will you buff?"
        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            let menu = document.getElementById('typingBoard');
            menu.innerHTML += makeButton(combatants.monkeys[x].name, 'buff');
            
        }
        backButton();
        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            createEventListen(combatants.monkeys[x].name, 'buff');
        }
        actionName = 'buff';
    }

function backButton(){
    let menu = document.getElementById('typingBoard');
    menu.innerHTML += '<button id="back">BACK</button>'

    let name = `back`;
    document.getElementById(`${name}`).addEventListener('click', event=>{
        clearButtons();
        combatMenu();
        clearLog();
    })
}

chooseApe();


function setupAllies(){
    for(let i = 0; i < combatants.monkeys.length; i++ )
    {
        const x = i;
        if(combatants.monkeys[x].name !== 'Player')
        {
            console.log(combatants.monkeys[x].name, "created Attack")
            attackClock(combatants.monkeys[x]);
        }
    }
}

function createEnemies(){
    for(let i = 0; i < combatants.enemies.length; i++ )
    {
        const x = i;

        attackClock(combatants.enemies[x]);
    }

}

function populateViewport(){

}
