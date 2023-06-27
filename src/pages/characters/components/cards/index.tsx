import { ICharacters } from "@/interfaces/characters";
import { Card } from "../card";

import { StyledContainerCards } from "./styles";

export const Cards: React.FC<ICharacters> = ({ data: { results } }) => {
  return (
    <StyledContainerCards data-testid="id-cards-container">
      {results.map((character, index) => (
        <div data-testid="id-cards-content" key={index}>
          <Card character={character}  data-testid="teste" />
        </div>
      ))}
    </StyledContainerCards>
  );
};
