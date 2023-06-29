
import { ICharactersProps } from "../../interfaces/charactersProps";
import { StyledContainerCard, StyledImg, StyledTypographName } from "./styles";
import { useNavigate } from "react-router-dom";
export const Card: React.FC<ICharactersProps> = ({ character }) => {
  
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate("/characters/" + character.id);
  };

  return (
    <StyledContainerCard
      onClick={handleClickCard}
      data-testid="id-card-container"
    >
      <StyledTypographName data-testid="id-typograph-name-content">
        {character.name}
      </StyledTypographName>
      <StyledImg
        data-testid="id-img-content"
        src={character.thumbnail.path + "." + character.thumbnail.extension}
        alt={`Image for character ${character.name}`}
      />
    </StyledContainerCard>
  );
};
