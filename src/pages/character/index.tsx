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
  const { id: idCharacter } = useParams();
  const { data: characters } = useDataFetcher<ICharacters>(
    "characters/" + idCharacter
  );

  const [character, setCharacter] = useState<ICharacter>();

  useEffect(() => {
    if (!isEmpty(characters)) {
      const { results } = characters.data;
      setCharacter(results[0]);
    }
  }, [characters]);

  return (
    <CharacterPage data-testid="id-character-page">
      {character && (
        <>
          <CharacterPageImage
            data-testid="id-character-page-image"
            src={character.thumbnail.path + "." + character.thumbnail.extension}
            alt={`Image for character ${character.name}`}
          />
          <CharacterPageContent data-testid="id-character-page-content">
            <CharacterPageName data-testid="id-character-name">
              {character.name}
            </CharacterPageName>
            <CharacterPageDetails data-testid="id-character-page-details">
              <CharacterPageDetailsParagraph data-testid="id-character-description">
                {character.description}
              </CharacterPageDetailsParagraph>
              <CharacterPageDetailsParagraph data-testid="id-character">
                #ID: {idCharacter}
              </CharacterPageDetailsParagraph>
            </CharacterPageDetails>
          </CharacterPageContent>
        </>
      )}
    </CharacterPage>
  );
};
