const fetchPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
    const pokemonData = await response.json();
    console.log(pokemonData);
}

fetchPokemon()
