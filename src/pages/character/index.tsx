import { useDataFetcher } from "@/hooks/useDataFetcher";

import {
  CharacterPage,
  CharacterPageImage,
  CharacterPageContent,
  CharacterPageName,
  CharacterPageDetails,
  CharacterPageDetailsParagraph,
} from "./styles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { ICharacters } from "@/interfaces/characters";
import { ICharacter } from "@/interfaces/character";


export const Character: React.FC = () => {
  const { id } = useParams();
  const { data: characters } = useDataFetcher<ICharacters>("characters/" + id);

  const [character, setCharacter] = useState<ICharacter>();

  useEffect(() => {
    if (!isEmpty(characters)) {
      const { results } = characters.data;
      setCharacter(results[0]);
    }
  }, [characters]);

  return (
    <CharacterPage>
      {character && (
        <>
          <CharacterPageImage
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={`Imagem do personagem ${character.name}`}
          />
          <CharacterPageContent>
            <CharacterPageName>{character.name}</CharacterPageName>
            <CharacterPageDetails>
              <CharacterPageDetailsParagraph>
                {character.description}
              </CharacterPageDetailsParagraph>
              <CharacterPageDetailsParagraph>
                #ID: {character.id}
              </CharacterPageDetailsParagraph>
            </CharacterPageDetails>
          </CharacterPageContent>
        </>
      )}
    </CharacterPage>
  );
};
