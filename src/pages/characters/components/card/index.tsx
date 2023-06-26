import { ICharactersProps } from "../../interfaces/charactersProps";
import { StyledContainerCard, StyledImg, StyledTypographName } from "./styles";
import { useNavigate } from "react-router-dom";
export const Card: React.FC<ICharactersProps> = ({ characters }) => {
  
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate("/characters/" + characters.id);
  };

  return (
    <StyledContainerCard
      onClick={handleClickCard}
      data-testid="id-card-container"
    >
      <StyledTypographName data-testid="id-typograph-name-content">
        {characters.name}
      </StyledTypographName>
      <StyledImg
        data-testid="id-img-content"
        src={characters.thumbnail.path + "." + characters.thumbnail.extension}
        alt={`Imagem do personagem ${characters.name}`}
      />
    </StyledContainerCard>
  );
};
