const moves = document.getElementById("moves-count");
const startButton = document.getElementById("start");
const cambiarButton = document.getElementById("cambiarturno");
const retrocedeButton = document.getElementById("retroceder");
const avanzarButton = document.getElementById("avanzar");

const page = document.getElementById("ingresa");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let ingresa;
let pokemon;

//Pokemones items
const items = [
    { name: "bullbasaur", image: "Bulbasaur.png" },
    { name: "chansey", image: "Chansey.png" },
    { name: "charmander", image: "Charmander.png" },
    { name: "cubone", image: "Cubone.png" },
    { name: "meta", image: "meta.png" },
    { name: "robot", image: "robot.png" },
    { name: "squirtle", image: "Squirtle.png" },

];
//Calcular movimientos
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};
const moveRight = () => {
    // Incrementa la posición horizontal
    posX += 6;

    // Actualiza la posición del personaje en la pantalla
    character.style.left = posX + 'px';

    // Incrementa el contador de movimientos
    movesCounter();
};
const addButton = document.getElementById('addButton');
addButton.addEventListener('click', addCharacter);

function addCharacter() {
    const colorInput = document.getElementById('colorInput');
    const nameInput = document.getElementById('nameInput');

    const color = colorInput.value;
    const name = nameInput.value;

    // Crea un nuevo elemento div para representar el personaje
    const characterDiv = document.createElement('div');
    characterDiv.className = 'character';

    // Establece el estilo de fondo del personaje usando la imagen ingresada
    characterDiv.style.backgroundImage = `url('${color}.jpg')`;

    // Agrega el nombre del personaje como texto dentro del div
    const characterName = document.createElement('span');

    characterName.textContent = name;
    characterDiv.appendChild(characterName);

    // Agrega el personaje al contenedor
    const container = document.getElementById('container');
    container.appendChild(characterDiv);

    // Limpia los campos de entrada después de agregar el personaje
    colorInput.value = '';
    nameInput.value = '';
}

const generateRandom = (size = 4) => {
    //temporary array
    let tempArray = [...items];
    //initializes cardValues array
    let valoresPokemo = [];
    //size should be double (4*4 matrix)/2 since pairs of objects would exist
    size = (size * size) / 2;
    //Random object selection
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        valoresPokemo.push(tempArray[randomIndex]);
        //once selected remove the object from temp array
        tempArray.splice(randomIndex, 1);
    }
    return valoresPokemo;
};

const matrixGenerator = (valoresPokemo, size = 4) => {
    gameContainer.innerHTML = "";
    valoresPokemo = [...valoresPokemo, ...valoresPokemo];
    //simple shuffle
    valoresPokemo.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {

        gameContainer.innerHTML += `
     <div class="pokemon-container" data-pokemon-value="${valoresPokemo[i].name}">
        <div class="pokemon">?</div>
        <div class="pokemon-after">
        <img src="${valoresPokemo[i].image}" class="image"/></div>
     </div>
     `;
    }
    //Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    //pokemones

    pokemones = document.querySelectorAll(".pokemon-container");
    pokemones.forEach((poke) => {
        poke.addEventListener("click", () => {
            if (!poke.classList.contains("matched")) {
                movesCounter();
                moveRight();
            } else {
                moveRight();
                    //segundo pokemon
            }
        });
    });
};

//Start game
startButton.addEventListener("click", () => {
    movesCount = 0;

    //controls amd buttons visibility
    controls.classList.add("hide");
    startButton.classList.add("hide");

    //initial moves
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
});


//Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let pokemon = getSelection(pokemones);
    console.log(pokemones);
    matrixGenerator(pokemon);
};