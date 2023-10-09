import React, { useEffect} from 'react';
import VanillaTilt from 'vanilla-tilt';
import './style.css';

type ICharacter = {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  name: string;
};

const ListCharacters = ({ character }: { character: ICharacter }) => {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".CharacterView"), {
      max: 15,
      speed: 10,
      glare: true,
      'max-glare': 0.50
    })
  })
  return (
    <section className="CharacterView">
      <h2>{character.name}</h2>
      <ul className="CharacterDetails">
        <li>
          <strong>Birth Year</strong>: {character.birth_year}
        </li>
        <li>
          <strong>Eye Color</strong>: {character.eye_color}
        </li>
        <li>
          <strong>Gender</strong>: {character.gender}
        </li>
        <li>
          <strong>Hair Color</strong>: {character.hair_color}
        </li>
        <li>
          <strong>Height</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>Skin Color</strong>: {character.skin_color}
        </li>
      </ul>
    </section>
  );
};

export default ListCharacters;
