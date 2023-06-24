import { Card } from "../card";
import { ICardsSearchProps } from "../../interfaces/cardsSearchProps";
import { StyledContainerCards } from "./styles";




export const Cards: React.FC<ICardsSearchProps> = ({ data: { results } }) => {
  return (
    <StyledContainerCards>
      {results.length
        ? results.map((card, index) => (
            <Card card={card} index={index} key={index} />
          ))
        : "Nenhum personagem encontrado"}
    </StyledContainerCards>
  );
};
