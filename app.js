//Start at the top
window.scrollTo(0, 0);

//Shuffle an array's content
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

//Object array containing all cards and their images
let pairs = [ 
    {nombre: 'maria', url : 'img/parejas-001.png'},
    {nombre: 'maria', url : 'img/parejas-001.png'},
    {nombre: 'jose', url : 'img/parejas-002.png'},
    {nombre: 'jose', url : 'img/parejas-002.png'},
    {nombre: 'jesus', url : 'img/parejas-003.png'},
    {nombre: 'jesus', url : 'img/parejas-003.png'},
    {nombre: 'melchor', url : 'img/parejas-004.png'},
    {nombre: 'melchor', url : 'img/parejas-004.png'},
    {nombre: 'gaspar', url : 'img/parejas-005.png'},
    {nombre: 'gaspar', url : 'img/parejas-005.png'},
    {nombre: 'baltazar', url : 'img/parejas-006.png'},
    {nombre: 'baltazar', url : 'img/parejas-006.png'},
    {nombre: 'pastor', url : 'img/parejas-007.png'},
    {nombre: 'pastor', url : 'img/parejas-007.png'},
    {nombre: 'mula', url : 'img/parejas-008.png'},
    {nombre: 'mula', url : 'img/parejas-008.png'},
];
shuffle(pairs);//function call to shuffle the cards

//Creating game objects and state variables
const startBtn = document.getElementById("btn-comenzar");//I keep the start button in a constant
const gameBtn = document.getElementById("btn-juego");//The continue button is obtained and stored in a constant
const gameModal = document.getElementById("modal-juego");////The game-modal is obtained by ID and stored in a constant
const textModal = document.getElementById("texto");//Paragraph where the modal message is displayed
const game = document.getElementById("game");//Get the container of all cards
let counter = 0;//Found pairs counter
let beat = new Audio('');//variable used to store the different audios
let templateCard = document.getElementById("template-card").content;//The content of the template is obtained and saved in a variable
let state = [0, null];//Array that serves to know if the couples match

//Function used to create all cards
function createCards(game){
    let clone;//variable used to store a clone of the card
    pairs.forEach(pair =>{
        clone = templateCard.cloneNode(true);//the card is cloned
        clone.querySelector(".card-back").classList.add(pair.nombre);//add an array class to the clone
        clone.querySelector(".card-back").style.backgroundImage = `url(${pair.url})`;//its corresponding image is added to the name of the class
        game.appendChild(clone);//the card is added to the parent container
    });
}

//Flips the card (animation)
const flipCard = card => card.parentNode.classList.toggle('is-flipped');

//Game functionality
function checkState(state, target){
    switch (state[0]){
        case 1:
            state[1] = target;
            break;
        case 2:
            setTimeout(() => {
                if (state[1].classList[2] == target.classList[2]){
                    counter++;
                    playAudio('correcta');
                    state[0] = 0;
                    if (counter == 8){
                        winnerModal(state[1].classList[2]);
                    } else{
                        setTimeout(()=>playAudio(state[1].classList[2]), 300)
                        updateModal(state[1].classList[2]);
                    }
                    return;
                }
                playAudio('incorrecta');
                flipCard(state[1]);
                flipCard(target);
                state[0] = 0;
            }, 800)
            break;
    }
}

//Modal funcitonality
function updateModal(objectClass){
    window.scrollTo(0, 0);
    gameModal.classList.toggle("hide-modal");
    document.querySelector('body').classList.toggle('no-scroll');
    document.querySelector('.modal-'+ objectClass).classList.toggle('show-item');
    textModal.innerText = setModalText(objectClass);
    setTimeout(() => {
        document.querySelector('.modal-' + objectClass).classList.toggle('show-item');
        document.querySelector('.modal-' + objectClass).classList.toggle('hide-modal');
    }, 3000);
}

//Winner modal
function winnerModal(objectClass){
    window.scrollTo(0, 0);
    playAudio('final');
    document.querySelector('.modal-'+ objectClass).classList.toggle('show-item');
    gameModal.classList.toggle("hide-modal");
    document.querySelector('body').classList.toggle('no-scroll');
    document.querySelector('.modal-titulo').innerText = 'Armaste tu pesebre';
    textModal = 'Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad.';
    gameBtn.innerText = 'Volver a intentar';
}



//Sets some text according to the class
function setModalText(objectClass){

    //object with the texts for each class
    const TEXTOS = {
        'melchor': 'El villancico es un género de cancion cuya letra hace referencia a la navidad.',
        'baltazar': 'A la nanita nana es un villancio compuesto por Jeremías Quintero, oriundo de Barbacoas, Nariño.',
        'gaspar': 'La palabra tutaina es utilizada en Perú para referirse coloquialmente a una fiesta pequeña, por lo que el título de este villancico se refiere a la celebración de la tradicional novena de aguinaldos.',
        'jose': 'En Ecuador, México, Colombia, Guatemala, El Salvador, Venezuela, Perú, Argentina, Chile y Canarias, la figura del niño Jesús se coloca despúes de la llegada de la navidad.',
        'pastor': 'A las novenas se les llama "Las posadas" y son fiestas populares de Mexico, Honduras, Guatemala, El Salvador, Costa Rica, Nicaragua y Panamá.',
        'mula': 'En las posadas, cada uno de los nueve días representa un valor, como humildad, fortaleza, desapego, caridad, confianza, justicia, pureza, alegría y generosidad.',
        'jesus': 'El villancico es un género de canción cuya letra hace referencia a la navidad.',
        'maria': 'La primera celebración navideña en la que se montó un pesebre para la conmemoraciónd del nacimiento de Jesús fue en la nochebuena del año 1223, realizada por San Francisco de Asís.'
    }
    
    //saves the text for the specified class
    const string = TEXTOS[objectClass];

    return string;
}

//Loads each audio to the beat
function playAudio(string){

    //object with the audios for each class
    const AUDIOS = {
        'intro': 'Audio/intro.mp3',
        'final': 'Audio/final.mp3',
        'melchor': 'Audio/pareja1.mp3',
        'baltazar': 'Audio/pareja2.mp3',
        'gaspar': 'Audio/pareja3.mp3',
        'jose': 'Audio/pareja4.mp3',
        'pastor': 'Audio/pareja5.mp3',
        'mula': 'Audio/pareja6.mp3',
        'jesus': 'Audio/pareja7.mp3',
        'maria': 'Audio/pareja8.mp3',
        'correcta': 'Audio/correcta.mp3',
        'incorrecta': 'Audio/incorrecta.mp3'
    }

    //an audio object is instantiated for the audio corresponding to the class
    beat = new Audio(AUDIOS[string]);
    beat.play();
}

//Detects when a card is clicked and apllies game functionality
game.addEventListener('click', event =>{
    const target = event.target;
    const card = target.parentNode.children[1];

    if (state[1] != null && state[0] == 2) return;
    if (!(target.classList.contains('card-face'))) return;
    if ((target.parentNode.classList.contains('is-flipped'))) return;
    
    flipCard(target);
    state[0]++;
    checkState(state, card);
    event.stopPropagation();
});

//Evet Listener for continue button
startBtn.addEventListener('click', ()=> {
    startBtn.parentNode.parentNode.parentNode.classList.toggle('hide-modal');
    document.querySelector('body').classList.toggle('no-scroll')
    playAudio('intro')
});

//Evet Listener for start button
gameBtn.addEventListener('click', ()=> {
    if (counter == 8) location.reload();
    gameBtn.parentNode.parentNode.parentNode.parentNode.parentNode.classList.toggle('hide-modal');
    document.querySelector('body').classList.toggle('no-scroll')
    beat.pause();
});

createCards(game);