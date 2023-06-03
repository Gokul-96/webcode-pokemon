const header = document.createElement("header");
document.body.appendChild(header);

const h1 = document.createElement("h1");
h1.innerText = "Pokemon";
header.appendChild(h1);


const p = document.createElement("p");
p.innerText = "Pokemon List";
header.appendChild(p);

const main = document.createElement("main");
document.body.appendChild(main);

const div = document.createElement("div");
div.classList.add("container");
div.setAttribute("id", "container")
main.appendChild(div);

const section = document.createElement("section");
div.appendChild(section);

const article = document.createElement("article");
article.classList.add("result");
article.setAttribute("id", "result")
section.appendChild(article);


async function fetchPokemonDetail(url) {
  try {
    const response = await axios.get(url);
    const pokemonData = response.data;

    const htmlContent = `
      <div class="content-details">
      <a class="content-back" href="./index.html">Back</a>
        <h1 class="content-details-heading">${pokemonData.name}</h1>
       
          <table>
          <tr>
              <th>Weight</th>
              <th>Moves</th>
              <th>Ability</th>
          </tr>
          <tr>
              <td>${pokemonData.weight}</td>
              <td>${pokemonData.moves[0].move.name}</td>
              <td>${pokemonData.abilities[0].ability.name}</td>
                
          </tr>
        </table>
      <div>
      `;

    const detailElement = document.createElement('div');
    detailElement.innerHTML = htmlContent;

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    resultElement.appendChild(detailElement);
  } catch (error) {
    console.log(error);
  }
}

async function fetchData() {
  try {
    const response = await axios('https://pokeapi.co/api/v2/pokemon');
    const dataResult = response.data.results;
    const resultElement = document.getElementById('result');

    let htmlContent = '<ul>';

    dataResult.map((pokemon) => {
      htmlContent += `
      <li>
        <a href="#" onclick="fetchPokemonDetail('${pokemon.url}')"><span>${pokemon.name}</span> </a>
      </li>`;
    });
    resultElement.innerHTML = htmlContent;
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', fetchData);