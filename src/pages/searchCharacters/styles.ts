import { styled } from "styled-components";

const SearchCharactersPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1f1f1f;
`;

const SearchCharactersPageTitle = styled.h1`
  font-size: 4rem;
  text-align: center;

  color: #ff9900;
  display: flex;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
`;

const SearchCharactersPageSubtitle = styled.h2`
  font-size: 1.5rem;

  text-align: center;
  margin-bottom: 2rem;
  color: #ccc;
`;

const SearchCharactersPageSearchBar = styled.input`
  width: 400px;
  height: 40px;
  padding: 0.6rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px 0px 0px 5px;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
  ::placeholder {
    color: #999;
  }
`;

const SearchCharactersPageSearchButton = styled.button`
  width: 7rem;
  height: 40px;
  font-size: 1rem;
  border: none;
  border-radius: 0px 5px 5px 0px;
  background-color: #ff9900;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff6600;
  }
`;

const SearchCharactersPageSearchContainerBar = styled.div`
  display: flex;
  align-items: center;
`;
const SearchCharactersPageFooter = styled.p`
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 2rem;
  text-align: center;
`;

const SearchCharactersTitleIcon = styled.p`
  font-size: 3.5rem;
  margin: 18px 0px 0px 10px;
`;
export {
  SearchCharactersPage,
  SearchCharactersPageSearchBar,
  SearchCharactersPageSearchButton,
  SearchCharactersPageSearchContainerBar,
  SearchCharactersPageSubtitle,
  SearchCharactersPageTitle,
  SearchCharactersPageFooter,
  SearchCharactersTitleIcon,
};
