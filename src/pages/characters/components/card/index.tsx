import { ICardProps } from "../../interfaces/cardProps";
import {
  StyledContainerCard,
  StyledContainerImg,
  StyledTypographName,
} from "./styles";

export const Card: React.FC<ICardProps> = ({ card }: any) => {
  return (
    <StyledContainerCard onClick={() => console.log(card.id)}>
      <StyledTypographName>{card.name}</StyledTypographName>
      <StyledContainerImg
        src={card.thumbnail.path + "." + card.thumbnail.extension}
        alt=""
      />
    </StyledContainerCard>
  );
};
