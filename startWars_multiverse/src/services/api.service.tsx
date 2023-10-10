import axios from "axios";

const BASE_URL = "https://swapi.dev/";

const starWarsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchAllCharacters() {
  try {
    const response = await starWarsApi.get("api/people/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchAllPlanets() {
  try {
    const response = await starWarsApi.get("api/planets/1");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchCharacterByName(name) {
  try {
    const response = await starWarsApi.get(`api/people/?search=${name}`);
    console.log("Chamada API fetchByName: ", response.data)
    const character = response.data.results[0];
    return character;
  } catch (error) {
    console.log(error);
  }
}

export default {fetchAllCharacters, fetchAllPlanets, fetchCharacterByName};
