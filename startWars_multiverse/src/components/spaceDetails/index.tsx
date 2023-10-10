import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import starWarsApi from "../../services/api.service";

import ActivityIndicator from "../../../public/loading.gif";
import "./style.css";

interface ISpace {
  name: string;
  diameter: string;
  population: string;
  orbital_period: string;
  rotation_period: string;
  terrain: string;
}

const SpaceDetails = ({ homeworldData }: { homeworldData: ISpace }) => {
  const { name } = useParams();
  const [loading, setLoading] = useState(false);
  const [character, setCharacter] = useState<string | null>(null);
  const [homeworldId, setHomeworldId] = useState<string | null>(null);
  const [homeData, setHomeData] = useState<ISpace | null>(null);

  useEffect(() => {
    async function loadSpaces() {
      setLoading(true);
      try {
        const characterData = await starWarsApi.fetchCharacterByName(name);
        setCharacter(characterData);

        const homeworldUrlParts = characterData.homeworld.split("/");
        const homeworldId = homeworldUrlParts[homeworldUrlParts.length - 2];

        setHomeworldId(homeworldId);

        const homeworldData = await starWarsApi.fetchHomeWorldById(homeworldId);
        console.log("homeWorldData: ", homeworldData);
        setHomeData(homeworldData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    loadSpaces();
  }, [name]);

  return (
    <main>
      <header>
        <h1 className="fontCustom" style={{ letterSpacing: "15px" }}>
          Details about planet {homeData?.name}
        </h1>
      </header>
      <section className="CharacterView">
        {homeData ? (
          <ul className="grid-spaces">
            <li>
              <strong>Name</strong>: {homeData.name}
            </li>
            <li>
              <strong>Diameter</strong>: {homeData.diameter}
            </li>
            <li>
              <strong>Population</strong>: {homeData.population}
            </li>
            <li>
              <strong>Orbital Period</strong>: {homeData.orbital_period}
            </li>
            <li>
              <strong>Rotation Period</strong>: {homeData.rotation_period}
            </li>
            <li>
              <strong>Terrain</strong>: {homeData.terrain}
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
};

export default SpaceDetails;
