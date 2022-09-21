function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

const fetchPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
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
    for(let i = 0; i < 5; i++) {
        let moveItem = document.createElement('li');
        moveItem.textContent = pokemonData.moves[i].move.name;
        movesList.append(moveItem);
    }
}

fetchPokemon();
