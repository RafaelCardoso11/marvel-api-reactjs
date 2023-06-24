import { Card } from "../card";
import { ICardsSearchProps } from "../../interfaces/charactersSearchProps";
import { StyledContainerCards } from "./styles";




export const Cards: React.FC<ICardsSearchProps> = ({ data: { results } }) => {
  return (
    <StyledContainerCards>
      {results.length
        ? results.map((characters, index) => (
            <Card characters={characters} index={index} key={index} />
          ))
        : "Nenhum personagem encontrado"}
    </StyledContainerCards>
  );
};
