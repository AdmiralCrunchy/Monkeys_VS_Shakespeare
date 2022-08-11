let pulledApi = null;

//Combat Vairables
window.globalTimer = null;
let actionName = null;
let menuRan = null;
let playerCharacter= null;
let playerAlly = null;
let chosenEnemy = null;
let actionTarget = null;
let totalWordsTyped = null;
let totalWPM = null;
let totalAttempts = null;

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
        this.defense_Points = 15;
        this.is_Ape = true;
    }
    isAlive()
    {
        if(this.health_Points <=0){
            document.getElementById(`combatLog`).innerHTML = `${this.name} has died! <br> May they live forever in monkey Valhalla!`;
            this.health_Points = 0;
            if(this.name == 'Player')
            {
                EndGame();
            }
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
        this.defense_Points = 0;
        this.is_Ape = false;
    }
    isAlive()
    {
        if(this.health_Points <=0){
            this.health_Points = 0;
            clearInterval(window.this);
            EndGame();
            document.getElementById(`playerBoard`).innerHTML += `${this.name} has died their second death!`
            return false;
        }
        return true;
    }
}

const Jeff = new Ape('Jeff', 5, 100, 100, 15000, 7, 5, 'DPS');
const Dipper = new Ape('Dipper', 5, 100, 100, 25000, 10, 5, 'tank');
const Bobo = new Ape('Bobo', 5, 100, 100, 26000, 10, 5, 'healer');
const Angela = new Ape('Angela', 5, 100, 100, 22000, 9, 5, 'wizard');


const BadGuy1 = new Enemy('William Shakespeare', 100, 100, 15000, 10);
const BadGuy2 = new Enemy('Oscar Wilde', 100, 50, 20000, 8);
const BadGuy3 = new Enemy('Mary Shelly', 100, 50, 30000, 20);

const combatantsPool = {
    monkeys: [Jeff, Dipper, Bobo, Angela],
    enemies: [BadGuy1, BadGuy2, BadGuy3]
};

const combatants = {
    monkeys: [playerCharacter, playerAlly],
    enemies: [chosenEnemy]
};

//Keyboard Variables

let wordPoolPool = ["The King doth keep his revels here tonight; Take heed the Queen come not within his sight, For Oberon is passing fell and wrath, Because that she, as her attendant, hath A lovely boy, stol’n from an Indian king; She never had so sweet a changeling. And jealous Oberon would have the childKnight of his train, to trace the forests wild: But she perforce withholds the lovèd boy, Crowns him with flowers, and makes him all her joy. And now they never meet in grove or green, By fountain clear, or spangled starlight sheen, But they do square; that all their elves for fear Creep into acorn cups, and hide them there.", "Verona was coming to life: people poured out of the houses and filled the streets while market traders set up their stalls in the grand piazza. It was a good patch, an excellent place to catch the business of those who lived and worked in the rich houses that lined Verona’s main square.", "The Capulet mansion was one of the biggest filled with servants and humming with activity. It was an hour till breakfast and while the cooks sweated over the fires in the kitchen, conjuring mouthwatering aromas of baked breads and hams, the servingmen killed time as best they could. Two of them hot, bored and restless stepped out into the bustle of the piazza and swaggered about among the bright colours, the animal smells and the din of traders’ voices, hoping to find some action.`, 'Was it all true? Had the portrait really changed? Or had it been simply his own imagination that had made him see a look of evil where there had been a look of joy? Surely a painted canvas could not alter? The thing was absurd. It would serve as a tale to tell Basil some day. It would make him smile.", "Fair lovers, you are fortunately met. Of this discourse we more will hear anon. Egeus, I will overbear your will; For in the temple, by and by with us, These couples shall eternally be knit. And, for the morning now is something worn, Our purpos’d hunting shall be set aside. Away with us to Athens. Three and three, We’ll hold a feast in great solemnity. Come, Hippolyta", "Believe me, king of shadows, I mistook. Did not you tell me I should know the man By the Athenian garments he had on? And so far blameless proves my enterprise That I have ’nointed an Athenian’s eyes: And so far am I glad it so did sort, As this their jangling I esteem a sport."];
let wordPool = null;
let combatTime = 30000;
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



//----------------------------//
//-                          -//
//       Word Generation      //
//-                          -//
//----------------------------//

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
    const wordsCount = wordPool.length;
    const randomIndex = Math.ceil(Math.random() * wordsCount-1);
    return wordPool[randomIndex];
}

function formatWord(word) {
    return `<div class="words"><span class="letter">${word.split('').join(`</span><span class="letter">`)}</span></div>`;
}

function pullPool(){
    const randomIndex = Math.ceil(Math.random() * wordPoolPool.length-1);
    return wordPoolPool[randomIndex];
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
    
    let tempFile = pullPool()
    
    wordPool = tempFile.split(' ');

    const cursor = document.getElementById('cursor');
    const board = document.getElementById('typingBoard');

    switch(mode){
        case 'attack':
        
            for(let i = 0; i <= wordPool.length-1; i++)
            {
                const v = i;
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(wordPool[v]);
            }
            combatTime = 30000;
            break;
        case 'defend':
            for (let i = 0; i < 50; i++) {
                const text = document.getElementById('wording');
                text.innerHTML += formatWord(randomWords());
            }
            combatTime = 15000;
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

    cursor.style.top = (board.getBoundingClientRect().top+2)+'px' ;
    cursor.style.left = (board.getBoundingClientRect().left+2)+'px';
   
}

function gettingQuotes(){

    fetch("https://type.fit/api/quotes")
    .then(function(response) {
         return response.json();
    })
    .then(function(data) {
        console.log("JSON: ",data);

        pulledApi = data;
        let stringedApi = JSON.stringify(pulledApi)
        let parsedApi = JSON.parse(stringedApi)

    console.log(parsedApi)

    // const randomIndex = Math.ceil(Math.random() * parsedApi.length-1);
    // wordPool = parsedApi[randomIndex].text;
    });
    
}

//----------------------------//
//-                          -//
//       End of Keyboard      //
//-                          -//
//----------------------------//


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
    
    totalWordsTyped += typedWords.length;
    totalWPM += wpmScore;
    totalAttempts++;
    removeKeyboard();
    actionLand(wpmScore, accScore, totalDone);
}

function actionLand(wpm, acc, total){

    let player = combatants.monkeys.find(element => element.name = "Player")
    let totalScore = null;

    if(finishedEarly){
        totalScore = Math.floor(((wpm * (acc/ 100))*1.5)*(total/100));
    }
    else{
        totalScore = Math.floor(wpm * (acc/ 100)*(total/100))
    }
    switch (actionName) {
        case 'attack':
            player.attack_Damage = player.attack_Damage + totalScore
            attackTarget(player, actionTarget);
            player.attack_Damage = player.attack_Damage - totalScore
            break;
        case 'defend':
            defendTarget(player, actionTarget, totalScore);
            break;
        case 'heal':
            healTarget(player, actionTarget, totalScore);
            break;
        case 'buff':
            buffTarget(player, actionTarget);
            break;
        case 'debuff':
            debuffTarget(player, actionTarget);
            break;
        default:
            break;
    }

    actionName = null;
    combatMenu()
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

    if(currentWord.getBoundingClientRect().top > 425) {
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

function getTarget(unit){

    if(unit.is_Ape)
    {
        const randomIndex = Math.ceil(Math.random() * combatants.enemies.length-1);

        return combatants.enemies[randomIndex]
    }
    else{
        const randomIndex = Math.ceil(Math.random() * combatants.monkeys.length-1);

        return combatants.monkeys[randomIndex]
    }
    
}

function attackClock(unit) {

    window.unit= setInterval(() =>{

        attackTarget(unit,getTarget(unit));        
        window.unit++;

        if(unit.health_Points <=0)
        {
            clearInterval(window.unit)
        }
    }, unit.attack_Speed)
}

function attackTarget(attacker, target) {
    
    if(target.isAlive() == true)
    {
        let leftOver = 0;

        if(target.defense_Points > 0)
        {
            leftOver = attacker.attack_Damage - target.defense_Points;
            target.defense_Points = target.defense_Points - attacker.attack_Damage;
            if(leftOver <= 0)
            {
                target.defense_Points = 0;
                if(attacker.name == "Player")
                {
                    document.getElementById('info').innerHTML = `${target.name} completely blocked ${attacker.name}'s attack! <br> TOTALLY EMBARRASSSING`;
                }else{
                    document.getElementById('combatLog').innerHTML = `${target.name} completely blocked ${attacker.name}'s attack! <br> TOTALLY EMBARRASSSING`;
                }
            }else{
                target.health_Points = target.health_Points - leftOver;
                document.getElementById('combatLog').innerHTML = `${attacker.name} has attacked ${target.name}! <br> They have ${target.health_Points} HP Left!`
                target.isAlive();
            }
            
        }
        else
        {

            target.health_Points = target.health_Points - attacker.attack_Damage;
            if(attacker.name == "Player")
            {
                document.getElementById('info').innerHTML = `${attacker.name} has attacked ${target.name}! <br> They have ${target.health_Points} HP Left!`
            }else{
                document.getElementById('combatLog').innerHTML = `${attacker.name} has attacked ${target.name}! <br> They have ${target.health_Points} HP Left!`
            }
            
            
            target.isAlive();
        }
    }
    else{
        document.getElementById('combatLog').innerHTML = `${attacker.name} has attacked ${target.name}! <br> OH THE HUMANITY`
    }
}

function defendTarget(origin, target, score) {
    
    if(target.isAlive() == true)
    {
        target.defense_Points = target.defense_Points + score;
        document.getElementById('combatLog').innerHTML = `${origin.name} has defended ${target.name}! <br> They have ${score} defense points!`
    }
    else{
        document.getElementById('combatLog').innerHTML = `${origin.name} has defended ${target.name}! <br> BUT THEY ARE LONG DEAD!`
    }
}

function healTarget(origin, target, score) {
    
    if(target.isAlive() == true)
    {
        target.health_Points = target.health_Points + score + 10
        if(target.health_Points > target.max_Health)
        {
            target.health_Points = target.max_Health;
        }
        document.getElementById('combatLog').innerHTML = `${origin.name} has healed ${target.name}! <br> They have ${target.health_Points} HP!`
    }
    else{
        document.getElementById('combatLog').innerHTML = `${origin.name} has healed ${target.name}! <br> BUT THEY ARE SUPER DEAD!`
    }
}

function buffTarget(origin, target){
    if(target.name == 'Player')
    {
        document.getElementById('info').innerHTML = `${origin.name} has buffed ${target.name}! <br> They have ${target.attack_Speed} !`
    }
    else{
        const speedBuff = -1000;
        target.attack_Speed = target.attack_Speed + speedBuff;
        document.getElementById('info').innerHTML = `${origin.name} debuffed ${target.name} attack speed! <br> Now its ${target.attack_Speed} !`
    }
    
}

function debuffTarget(origin, target){
    const speedBuff = 20000;
    target.attack_Speed = target.attack_Speed + speedBuff;
    document.getElementById('info').innerHTML = `${origin.name} has debuffed ${target.name}! <br> They have attack much slower!`
}

function combatMenu(){
    document.getElementById('combatLog').innerHTML ='What Action will you take? <br> Choose one of the following: '
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
    gameClock();    
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
        createEventListen(combatants.enemies[x], 'attack');
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
            createEventListen(combatants.monkeys[x], 'defend');
        }  
    }
    else{
        document.getElementById('combatLog').innerHTML = "Defending Self!";
        actionTarget = player;
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
            createEventListen(combatants.monkeys[x], 'heal');
        }     
    }
    else{
        
        document.getElementById('combatLog').innerHTML = "Casting a healing Spell!";

        initializeKeyboard(actionName);
    }  
    
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
        createEventListen(combatants.enemies[x], 'debuff');
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
            menu.innerHTML += makeButton(combatants.monkeys[x].name, 'buffing');
            
        }
        backButton();
        for(let i = 0; i < combatants.monkeys.length; i++ )
        {
            const x = i;
            createEventListen(combatants.monkeys[x], 'buffing');
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

function createEventListen(name, action){
    document.getElementById(`${name.name}${action}Button`).addEventListener('click', event =>{
        event.preventDefault();
        actionTarget = name;
        clearButtons();
        initializeKeyboard(actionName);
    })
}

//----------------------------//
//-                          -//
//          Set Up            //
//-                          -//
//----------------------------//

function chooseApe(){
    document.getElementById('combatLog').innerHTML = 'Choose Your Monkey <br> Jeff is DPS - Dipper is Tank - Bobo is Healer - Angela is Mage';
    document.getElementById('typingBoard').innerHTML = ' ';
    for(let i = 0; i < combatantsPool.monkeys.length; i++)
        {
            const x = i;
            let menu = document.getElementById('typingBoard');
            menu.innerHTML += makeButton(combatantsPool.monkeys[x].name, 'choose');
        }
    for(let i = 0; i < combatantsPool.monkeys.length; i++ )
        {
            const x = i;
            document.getElementById(`${combatantsPool.monkeys[x].name}chooseButton`).addEventListener('click', event =>{
                document.getElementById('playerCorner').innerHTML = `<div><img id="player" src="./images/${combatantsPool.monkeys[x].name}.png" alt=""> ${combatantsPool.monkeys[x].name}:Player </div>`
                combatants.monkeys[0] = combatantsPool.monkeys[x]
                combatants.monkeys[0].name = 'Player';
                
                clearButtons();
                chooseAllies();
            })
        }
}

function chooseAllies(){
    document.getElementById('combatLog').innerHTML = 'Choose an ally <br>';
    document.getElementById('typingBoard').innerHTML = ' ';
    for(let i = 0; i < combatantsPool.monkeys.length; i++)
    {
            const x = i;
            let menu = document.getElementById('typingBoard');
            if(combatantsPool.monkeys[x].name != 'Player')  {
                document.getElementById('combatLog').innerHTML += combatantsPool.monkeys[x].name + " "; 
                menu.innerHTML += makeButton(combatantsPool.monkeys[x].name, 'choose');
            }  
    }
    for(let i = 0; i < combatantsPool.monkeys.length; i++)
    {
        const x = i;
        if(combatantsPool.monkeys[x].name != 'Player')  {
            document.getElementById(`${combatantsPool.monkeys[x].name}chooseButton`).addEventListener('click', event =>{
                combatants.monkeys[1] = combatantsPool.monkeys[x];
                playerAlly = combatantsPool.monkeys[x];
                document.getElementById('playerCorner').innerHTML += `<div> <img id="player" src="./images/${combatantsPool.monkeys[x].name}.png" alt="">${combatantsPool.monkeys[x].name}</div>`
                clearButtons();
                chooseEnemy();
            })
        }  
    }
}

function chooseEnemy(){
    document.getElementById('combatLog').innerHTML = 'Choose an enemy <br>';
    for(let i = 0; i < combatantsPool.enemies.length; i++ )
    {
        const x = i;
        document.getElementById('combatLog').innerHTML += combatantsPool.enemies[x].name + " ";
        let menu = document.getElementById('typingBoard');
        menu.innerHTML += makeButton(combatantsPool.enemies[x].name, 'choose');
        
    }
    for(let i = 0; i < combatantsPool.enemies.length; i++ )
    {
        const x = i;
        
        document.getElementById(`${combatantsPool.enemies[x].name}chooseButton`).addEventListener('click', event =>{
            combatants.enemies[0] = combatantsPool.enemies[x];
            chosenEnemy = combatantsPool.enemies[x];
            document.getElementById('enemyCorner').innerHTML = `<img src="./images/${combatantsPool.enemies[x].name}.png" alt=""></div>`
            clearButtons();
            initializeCombat();
        })
    }

}


function setupAllies(){
    for(let i = 0; i < combatants.monkeys.length; i++ )
    {
        const x = i;
        if(combatants.monkeys[x].name == playerAlly.name)
        {
            attackClock(combatants.monkeys[x]);
        }
    }
}

function createEnemies(){
    for(let i = 0; i < combatants.enemies.length; i++ )
    {
        const x = i;
        if(combatants.enemies[x].name == chosenEnemy.name)
        {
            attackClock(combatants.enemies[x]);
        }
    }

}

function populateViewport(){

}

//----------------------------//
//-                          -//
//         Game End           //
//-                          -//
//----------------------------//

function EndGame(){
    document.getElementById('playBoard').innerHTML = `<section id="endScreen"></section>`;

    if(combatants.monkeys[0].health_Points <= 0){
        document.getElementById('endScreen').innerHTML = "<h1>YOU LOSE</h1>"
    }
    if(combatants.enemies[0].health_Points <= 0)
    {
        document.getElementById('endScreen').innerHTML = `<h1>YOU WIN!</h1>` 
    }
    let avgWPM = totalWPM / totalAttempts;
    
    document.getElementById('endScreen').innerHTML +=`<p> Total Words Typed: ${totalWordsTyped}<p>`
    document.getElementById('endScreen').innerHTML +=`<p> Average WPM: ${avgWPM}<p>`
    document.getElementById('endScreen').innerHTML +=`<p> Game Time: ${window.Game}<p>`

    endGameClock();
}


function gameClock(){
    window.Game= setInterval(() =>{        
        window.Game++;
    }, 1000)
}

function endGameClock(){
    window.endGame= setInterval(() =>{        
        window.endGame++;
        consloe.log(window.endGame)
        if(window.endGame == 10)
        {
            fetch('/chat', {
                method: 'GET',
            }).then((res) => {
                if (res.ok) {
                    location.href = '/chat';
                } else {
                    alert('trumpet sound');
                }
            });
        }
    }, 1000)
}

//----------------------------//
//-                          -//
//         Game Start         //
//-                          -//
//----------------------------//

chooseApe();