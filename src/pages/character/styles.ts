import { styled } from "styled-components";
const CharacterPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const CharacterPageImage = styled.img`
  width: 300px;
  margin-right: 20px;
`;

const CharacterPageContent = styled.div`
  flex: 1;
`;

const CharacterPageName = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const CharacterPageDetails = styled.div`
  margin-top: 10px;
`;

const CharacterPageDetailsParagraph = styled.p`
  margin: 0;
  line-height: 1.5;
`;
export {
  CharacterPage,
  CharacterPageImage,
  CharacterPageContent,
  CharacterPageName,
  CharacterPageDetails,
  CharacterPageDetailsParagraph,
};
