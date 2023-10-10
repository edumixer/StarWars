import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { describe, expect, it } from "vitest";
import App from "../App";
import SpaceDetails from "../components/spaceDetails";
import starWarsApi from "../services/api.service";

describe("Tests API Star Wars", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  it("should make an API call and return simulated data", async () => {
    // Configurar o mock para interceptar uma chamada GET à URL da API
    // e retornar dados simulados
    mock.onGet("https://swapi.dev/api/people/1").reply(200, {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
    });

    const response = await starWarsApi.fetchCharacterByName("Luke Skywalker");
    console.log("Resposta da minha API: ", response);

    // Verificar se os dados da API foram retornados corretamente
    expect(response).toEqual({
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "https://swapi.dev/api/planets/1/",
      films: [
        "https://swapi.dev/api/films/1/",
        "https://swapi.dev/api/films/2/",
        "https://swapi.dev/api/films/3/",
        "https://swapi.dev/api/films/6/",
      ],
      species: [],
      vehicles: [
        "https://swapi.dev/api/vehicles/14/",
        "https://swapi.dev/api/vehicles/30/",
      ],
      starships: [
        "https://swapi.dev/api/starships/12/",
        "https://swapi.dev/api/starships/22/",
      ],
      created: "2014-12-09T13:50:51.644000Z",
      edited: "2014-12-20T21:17:56.891000Z",
      url: "https://swapi.dev/api/people/1/",
    });
  });

  it("should successfully fetch Star Wars characters from the API", async () => {
    const response = await starWarsApi.fetchAllCharacters();
    expect(response).toBeTruthy();
  }, 10000);
});
describe("Testing component App", () => {
  it("should have an image", () => {
    render(<App />);
    const image = screen.queryByAltText("Star Wars Logo");
    expect(image).toBeTruthy();
  });
});

describe("Testing component SpaceDetails", () => {
  it("should not initially render planet details", () => {
    const mockSpaceData = {
      name: "Tatooine",
      diameter: "10465",
      population: "200000",
      orbital_period: "304",
      rotation_period: "23",
      terrain: "desert",
    };

    render(<SpaceDetails homeworldData={mockSpaceData} />);

    expect(screen.queryByText("Details about planet Tatooine")).toBeNull();
    expect(screen.queryByText("Name: Tatooine")).toBeNull();
    expect(screen.queryByText("Diameter: 10465")).toBeNull();
    expect(screen.queryByText("Population: 200000")).toBeNull();
    expect(screen.queryByText("Orbital Period: 304")).toBeNull();
    expect(screen.queryByText("Rotation Period: 23")).toBeNull();
    expect(screen.queryByText("Terrain: desert")).toBeNull();
  });
});
