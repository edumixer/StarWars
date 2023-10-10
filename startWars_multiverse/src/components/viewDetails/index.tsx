import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import starWarsApi from "../../services/api.service";
import SpaceDetails from "../spaceDetails";

import ActivityIndicator from "../../../public/loading.gif";
import "./style.css";

type ICharacter = {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
};

const CharacterView = () => {
  const { name } = useParams();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCharacter() {
      setLoading(true);
      try {
        const characterData = await starWarsApi.fetchCharacterByName(name);
        console.log("NOME CLICADO: ", name);
        setCharacter(characterData);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    fetchCharacter();
  }, [name]);

  return (
    <main>
      <header>
        <h1 className="fontCustom">Details about {character?.name}</h1>
      </header>
      <section className="CharacterView">
        {character ? (
          <ul className="grid-character">
            <li>
              <strong>Name</strong>: {character.name}
            </li>
            <li>
              <strong>Birth Year</strong>: {character.birth_year}
            </li>
            <li>
              <strong>Height</strong>: {character.height}
            </li>
            <li>
              <strong>Mass</strong>: {character.mass}
            </li>
            <li>
              <strong>Gender</strong>: {character.gender}
            </li>
            <li>
              <strong>Eye Color</strong>: {character.eye_color}
            </li>
            <li>
              <strong>Hair Color</strong>: {character.hair_color}
            </li>
            <li>
              <strong>Skin Color</strong>: {character.skin_color}
            </li>
          </ul>
        ) : loading ? (
          <img height={50} src={ActivityIndicator} />
        ) : (
          ""
        )}
      </section>
      <SpaceDetails />
    </main>
  );
};

export default CharacterView;
