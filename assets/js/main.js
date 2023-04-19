const pokemonsList = document.querySelector('#pokemonList')
const buttonMore = document.querySelector('#btnMore')
const maxRecords = 151;
const limit = 4;
let offset = 0;


function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) =>

      `
    <div class="flip-card">

      <div class="flip-card-inner">

        <div class="flip-card-front ${pokemon.type}">

          <div class="pokemonInf">
              <h3 id="pokemonName">${pokemon.name}</h3>
              <span id="pokemonID">${`#${pokemon.number}`}</span>
          </div>

          <img src="${pokemon.photo}" alt="${pokemon.name}">
      
          <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
          </ol>

        </div>

        <div class="flip-card-back ${pokemon.type}">
          <div class="backInf">
              <p class="backInfTitle"><strong>Height:</strong></p>
              <p id="height" class="inf">${pokemon.height}</p>
          </div>
          <div class="backInf">
              <p class="backInfTitle"><strong>Weight:</strong></p>
              <p id="weight" class="inf">${pokemon.weight}</p>
          </div>
          <div class="backInf">
            <p class="backInfTitle"><strong>Abilites:</strong></p>
            <div class="inf">
              ${pokemon.abilities.map((ability) => `<li class="">${ability.replace('-', ' ')}</li>`).join('')}
            </div>
            </div>
          </div>
        </div>
    </div>
    `
    ).join('')
    pokemonsList.innerHTML += newHtml
  })
}

loadPokemons(offset, limit)

buttonMore.addEventListener('click', () => {

  offset += limit
  const qtdRecords = offset + limit

  if (qtdRecords >= maxRecords) {

    const newLimit = maxRecords - offset
    loadPokemons(offset, newLimit)
    buttonMore.parentElement.remove()

  } else {
    loadPokemons(offset, limit)
  }

})

document.addEventListener("contextmenu", e => e.preventDefault());