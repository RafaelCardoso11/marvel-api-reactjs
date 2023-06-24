import { ICharactersProps } from "../../interfaces/charactersProps";
import {
  StyledContainerCard,
  StyledContainerImg,
  StyledTypographName,
} from "./styles";

export const Card: React.FC<ICharactersProps> = ({ characters }) => {
  return (
    <StyledContainerCard onClick={() => console.log(characters.id)}>
      <StyledTypographName>{characters.name}</StyledTypographName>
      <StyledContainerImg
        src={characters.thumbnail.path + "." + characters.thumbnail.extension}
        alt=""
      />
    </StyledContainerCard>
  );
};
