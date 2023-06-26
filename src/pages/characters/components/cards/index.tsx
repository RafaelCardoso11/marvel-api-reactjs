import { Card } from "../card";
import { ICardsSearchProps } from "../../interfaces/charactersSearchProps";
import { StyledContainerCards } from "./styles";

export const Cards: React.FC<ICardsSearchProps> = ({ data: { results } }) => {
  return (
    <StyledContainerCards data-testid="id-cards-container">
      {results.map((characters, index) => (
        <div data-testid="id-cards-content" key={index}>
          <Card characters={characters}  data-testid="teste" />
        </div>
      ))}
    </StyledContainerCards>
  );
};
