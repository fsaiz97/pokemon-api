let index;
// test

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
        let pokemonURL = `https://pokeapi.co/api/v2/pokemon-species/${searchTerm}`;
        const response = await fetch(pokemonURL);
        const pokemonData = await response.json();

        let pokemonDefaultEntry;
        for (variety in pokemonData.varieties) {
            if (pokemonData.varieties[variety].is_default) {
                let defaultPokemonRaw = await fetch(pokemonData.varieties[variety].pokemon.url);
                pokemonDefaultEntry = await defaultPokemonRaw.json();
                break;
            }
        }

        // Pokemon name
        getPokemonName(pokemonData);
    
        // Pokemon sprites
        getPokemonImage("front", pokemonDefaultEntry);
        getPokemonImage("back", pokemonDefaultEntry);

        // Pokemon moves
        getPokemonMoves(pokemonDefaultEntry);

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

const previousButton = document.querySelector('#previousPokemon');
previousButton.addEventListener('click', () => {
    index--;
    if(index <= 0) {
        index += 905; // magic number
    }
    fetchPokemon(index);
})

const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let userSearch = e.target.pokemonSearch.value;
    userSearch = userSearch.toLowerCase();
    fetchPokemon(userSearch);
})
