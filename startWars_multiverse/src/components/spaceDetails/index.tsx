import React, {useEffect, useState} from 'react';
import starWarsApi from "../../services/api.service";

import ActivityIndicator from "../../../public/loading.gif";
import './style.css'

interface ISpace {
  name: string;
  diameter: string;
  population: string;
  orbital_period: string;
  rotation_period: string;
  terrain: string;
}

const SpaceDetails = () => {
  const [loading, setLoading] = useState(false);
  const [spaces, setSpaces] = useState<ISpace | null>(null); // Defina o tipo corretamente aqui

  useEffect(() => {
    async function loadSpaces() {
      setLoading(true);
      try {
        const spaces: ISpace = await starWarsApi.fetchAllPlanets();
        console.log("SPACE: ", spaces);
        setSpaces(spaces);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadSpaces();
  }, []);

  return (
    <main>
      <header>
        <h1 className="fontCustom" style={{ letterSpacing: '15px'}}>Details about planet {spaces?.name}</h1>
      </header>
      <section className="CharacterView">
        {spaces ? (
          <ul className="grid-spaces">
            <li>
              <strong>Name</strong>: {spaces.name}
            </li>
            <li>
              <strong>Diameter</strong>: {spaces.diameter}
            </li>
            <li>
              <strong>Population</strong>: {spaces.population}
            </li>
            <li>
              <strong>Orbital Period</strong>: {spaces.orbital_period}
            </li>
            <li>
              <strong>Rotation Period</strong>: {spaces.rotation_period}
            </li>
            <li>
              <strong>Terrain</strong>: {spaces.terrain}
            </li>
          </ul>
        ) : loading ? (
          <img height={50} src={ActivityIndicator} />
        ) : (
          ""
        )}
      </section>
    </main>
  );
}

export default SpaceDetails;