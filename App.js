const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

//or Array(length).fill().map(//callback fn)
const generatePokemomPromise = Array.from({ length: 5 }).map((_, key) =>
  fetch(getPokemonUrl(key + 1)).then((response) => response.json())
);
console.log(generatePokemomPromise);

const obj = [{ name: 'Ednei', types: [{ name: 'voodd', id: 4 }], id: 10 }];

const generateHTML = (pokemons) =>
  pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map((el) => el.type.name);

    accumulator += `

      <li class="card ${elementTypes[0]}">
      <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"/>
        <h2 class="card-title">${id}. ${name} </h2>
        <p class="card-subtitle">${elementTypes.join(' ')}</p>   
      </li>
    `;

    return accumulator;
  }, '');

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

Promise.all(generatePokemomPromise)
  .then(generateHTML)
  .then(insertPokemonsIntoPage);
