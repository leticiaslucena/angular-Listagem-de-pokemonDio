const pokeApi = {}

function modelConversor(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetails.name
    pokemon.number = pokeDetails.id
    pokemon.weight = pokeDetails.weight
    pokemon.height = pokeDetails.height

    const types =  pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    
    const abilities =  pokeDetails.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities 
    
    pokemon.abilities = abilities
    pokemon.ability = ability
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetails.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(modelConversor)

}

pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}


