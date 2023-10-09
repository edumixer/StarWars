import axios from "axios";

const BASE_URL = "https://swapi.dev/";

const starWarsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function fetchData() {
  try {
    const response = await starWarsApi.get("api/people/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default {fetchData};
