let index;

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function getPokemonName(data) {
    let pokemonName = document.querySelector("#pokemonName");
    pokemonName.textContent = capitalize(data.name);
    // or pokemonName.style.textTransform = 'capitalize';
}

function getPokemonImage (imageType, data) {
    const image = document.querySelector(`#pokeImage${capitalize(imageType)}`);
    image.src = data.sprites[`${imageType}_default`];
}

function getPokemonMoves(data) {
    const movesList = document.querySelector("#moves");
        // clear current moves
        movesList.innerHTML = "";
        for(let i = 0; i < 5; i++) {
            try {
                let moveItem = document.createElement('li');
                moveItem.textContent = data.moves[i].move.name;
                movesList.append(moveItem);
            } catch (err) {
                if (err.name === "TypeError") {
                    break;
                } else {
                    console.log(err)
                }
            }
        }
}

const fetchPokemon = async (searchTerm) => {
    try {
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
        const response = await fetch(pokemonURL);
        const pokemonData = await response.json();

        // Pokemon name
        getPokemonName(pokemonData);
    
        // Pokemon sprites
        getPokemonImage ("front", pokemonData);
        getPokemonImage ("back", pokemonData);

        // Pokemon moves
        getPokemonMoves(pokemonData);

        index = pokemonData.id;
    } catch (err) {
        console.log(err)
    }
}

index = 1;

fetchPokemon(index);

const nextButton = document.querySelector('#nextPokemon');
nextButton.addEventListener('click', () => {
    index++;
    fetchPokemon(index);
})

const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let userSearch = e.target.pokemonSearch.value;
    userSearch = userSearch.toLowerCase();
    fetchPokemon(userSearch);
})
