//Start at the top
window.scrollTo(0, 0);

//Shuffle an array's content
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);//returns the random scrambled array
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
    let id=0;//variable used to add an id to the cards for the entrance animation
    pairs.forEach(pair =>{
        clone = templateCard.cloneNode(true);//the card is cloned
        clone.querySelector(".card-back").classList.add(pair.nombre);//add an array class to the clone
        clone.querySelector(".card-back").style.backgroundImage = `url(${pair.url})`;//its corresponding image is added to the name of the class
        clone.querySelector(".card-inner").setAttribute("id", "tarjeta"+id);//Add an id for the card
        clone.querySelector(".card-inner").classList.add("none");//add a class to the letter to hide it
        id++;//increase the id value by 1
        game.appendChild(clone);//the card is added to the parent container
    });
    addCardsAnimation();
}

//Add initial animation to the cards
function addCardsAnimation(){
    for (let n = 0; n < 16; n++) { //animation of each card at the entrance
        let cards_n = document.getElementById("tarjeta" + n) //we get the content inside the tag
        setTimeout(() => { //delay
            cards_n.classList.toggle("none"); //quitarle la clase none para que se muestre la tarjeta
        }, 200 + (150 * n));

        setTimeout(() => { //delay
            cards_n.classList.add("animation-card"); //We add the cardAnimation class so that the animation can be seen
        }, 200 + (150 * n));
    }
}

//Flips the card (animation)
const flipCard = card => card.parentNode.classList.toggle('is-flipped');//swap the class to flip the card

//Game functionality
function checkState(state, target){//in case the state in position 0
    switch (state[0]){
        case 1:
            state[1] = target;//the array in position 1 will be equal to the card
            break;
        case 2:
            setTimeout(() => {//function to control that something happens in a certain time
                if (state[1].classList[2] == target.classList[2]){//if the classes are the same
                    counter++; //increases the counter of pairs found
                    playAudio('correcta');//play the correct audio
                    state[0] = 0; //set the value to 0
                    if (counter == 8){ //if all pairs have been found
                        winnerModal(state[1].classList[2]);//the winner modal is displayed
                    } else{
                        setTimeout(()=>playAudio(state[1].classList[2]), 300)//wait for a while and play the corresponding audio
                        updateModal(state[1].classList[2]);//update game modal
                    }
                    return;
                }
                playAudio('incorrecta');//play the incorrect audio
                flipCard(state[1]);//flip the card
                flipCard(target);//flip the card
                state[0] = 0; //set the value to 0
            }, 800)
            break;
    }
}

//Modal funcitonality
function updateModal(objectClass){
    window.scrollTo(0, 0);//Start at the top
    gameModal.classList.toggle("hide-modal");//swap the class to hide the modal
    document.querySelector('body').classList.toggle('no-scroll');//swap the class to scroll or not-scroll
    document.querySelector('.modal-'+ objectClass).classList.toggle('show-item');//swap the class to display the image in the manger modal
    textModal.innerText = setModalText(objectClass);//puts the text corresponding to that class
    setTimeout(() => {//function to control that something happens in a certain time
        document.querySelector('.modal-' + objectClass).classList.toggle('show-item');//swap the class to display the image in the manger modal
        document.querySelector('.modal-' + objectClass).classList.toggle('hide-modal');//swap the class to hide the modal
    }, 3000);
}

//Winner modal
function winnerModal(objectClass){
    window.scrollTo(0, 0);//Start at the top
    playAudio('final');//play the audio final
    document.querySelector('.modal-'+ objectClass).classList.toggle('show-item');//swap the class to show-item
    gameModal.classList.toggle("hide-modal");////swap the class to hide the modal
    document.querySelector('body').classList.toggle('no-scroll');//swap the class to scroll or not-scroll
    document.querySelector('.modal-titulo').innerText = 'Armaste tu pesebre';//change the title of the modal text
    textModal = 'Y junto con la esperanza de la llegada del Niño Dios te deseamos de todo corazón que ese regalo que tanto has anhelado llegue a ti en esta navidad.';//change the text of the modal
    gameBtn.innerText = 'Volver a intentar';//change button text
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
    beat.play();//play the audio
}

//Detects when a card is clicked and apllies game functionality
game.addEventListener('click', event =>{
    const target = event.target; //the target is equal to the card clicked
    const card = target.parentNode.children[1];//card is equal as the back of the card, where the image and the class are

    //conditions to check the functionality of the game
    if (state[1] != null && state[0] == 2) return;//if the state in position 0 is different from null and in position 1 it is equal to 2
    if (!(target.classList.contains('card-face'))) return;//if the target does not contain the card-face class
    if ((target.parentNode.classList.contains('is-flipped'))) return;//if the parent node contains the class is-flipped
    
    flipCard(target);//flip the card
    state[0]++;//increases the status value at position 0 by 1
    checkState(state, card);//calls the check state function and passes it the state and the target
    event.stopPropagation();//stops propagation of events
});

//Evet Listener for start button
startBtn.addEventListener('click', ()=> {
    startBtn.parentNode.parentNode.parentNode.classList.toggle('hide-modal');//swap the class to hide the modal
    document.querySelector('body').classList.toggle('no-scroll');//change the class to not scroll
    playAudio('intro');//play the intro audio
});

//Evet Listener for game button
gameBtn.addEventListener('click', ()=> {
    if (counter == 8) location.reload();//If all the couples have already been found, reload the page
    gameBtn.parentNode.parentNode.parentNode.parentNode.parentNode.classList.toggle('hide-modal');//swap the class to hide the modal
    document.querySelector('body').classList.toggle('no-scroll');////change the class to not scroll
    beat.pause();//pause the audio
});

createCards(game);//function call to create the cards inside the game container