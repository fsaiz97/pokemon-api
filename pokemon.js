function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

const fetchPokemon = async (pokemonIndex) => {
    try {
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`
        const response = await fetch(pokemonURL);
        const pokemonData = await response.json();
    
        // Pokemon name
        let pokemonName = document.querySelector("#pokemonName");
        pokemonName.textContent = capitalize(pokemonData.name);
        // or pokemonName.style.textTransform = 'capitalize';
    
        // Pokemon sprites
        const pokemonImageFront = document.querySelector("#pokeImageFront");
        pokemonImageFront.src = pokemonData.sprites.front_default;
        const pokemonImageBack = document.querySelector("#pokeImageBack");
        pokemonImageBack.src = pokemonData.sprites.back_default;
    
        // Pokemon moves
        const movesList = document.querySelector("#moves");
        // clear current moves
        movesList.innerHTML = "";
        for(let i = 0; i < 5; i++) {
            let moveItem = document.createElement('li');
            moveItem.textContent = pokemonData.moves[i].move.name;
            movesList.append(moveItem);
        }
    } catch (err) {
        console.log(err)
    }
}

let index = 1;

fetchPokemon(index);

const nextButton = document.querySelector('#nextPokemon');
nextButton.addEventListener('click', () => {
    index++;
    fetchPokemon(index);
})
