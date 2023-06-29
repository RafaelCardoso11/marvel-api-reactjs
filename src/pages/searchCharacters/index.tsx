import { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  SearchCharactersPage,
  SearchCharactersPageTitle,
  SearchCharactersPageSubtitle,
  SearchCharactersPageSearchBar,
  SearchCharactersPageSearchButton,
  SearchCharactersPageSearchContainer,
  SearchCharactersPageFooter,
  SearchCharactersTitleIcon,
} from "./styles";
import { useNavigate } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
export const SearchCharacters = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchNavigate = () => {
    navigate("/characters?nameStartsWith=" + searchValue);
  };

  const handleChangeValueSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleEnterKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSearchNavigate();
    }
  };

  return (
    <SearchCharactersPage>
      <SearchCharactersPageTitle>
        Search for your favorite hero
        <SearchCharactersTitleIcon>
          <AiOutlineSearch />
        </SearchCharactersTitleIcon>
      </SearchCharactersPageTitle>
      <SearchCharactersPageSubtitle>
        Find information about your favorite Marvel heroes.
      </SearchCharactersPageSubtitle>
      <SearchCharactersPageSearchContainer>
        <SearchCharactersPageSearchBar
          type="text"
          placeholder="Search for your favorite Marvel Hero"
          value={searchValue}
          onKeyDown={handleEnterKeyPress}
          onChange={handleChangeValueSearch}
        />
        <SearchCharactersPageSearchButton onClick={handleSearchNavigate}>
          Search
        </SearchCharactersPageSearchButton>
      </SearchCharactersPageSearchContainer>
      <SearchCharactersPageFooter>
        ⚡️ Não julgue o livro pela capa! O design pode não ser de outro mundo,
        mas o código é digno do Multiverso! ✨🚀
      </SearchCharactersPageFooter>
    </SearchCharactersPage>
  );
};
