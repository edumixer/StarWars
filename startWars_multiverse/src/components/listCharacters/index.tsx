import React, { useEffect} from 'react';
import VanillaTilt from 'vanilla-tilt';
import './style.css';

type ICharacter = {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
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
          <strong>Height</strong>: {character.height}
        </li>
        <li>
          <strong>Mass</strong>: {character.mass}
        </li>
        <li>
          <strong>...</strong>
        </li>
      </ul>
    </section>
  );
};

export default ListCharacters;
