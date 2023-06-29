import { ICharacters } from "@/interfaces/characters";
import { Card } from "../card";

import { CardsContainer, CardContainer } from "./styles";

export const Cards: React.FC<ICharacters> = ({
  data: { results: characters },
}) => {
  return (
    <CardsContainer data-testid="id-cards-container">
      {characters.map((character, index) => (
        <CardContainer data-testid="id-cards-content" key={index}>
          <Card character={character} />
        </CardContainer>
      ))}
    </CardsContainer>
  );
};
