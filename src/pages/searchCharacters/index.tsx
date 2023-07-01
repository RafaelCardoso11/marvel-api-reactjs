import { ChangeEvent, KeyboardEvent, useState } from "react";
import {
  SearchCharactersPage,
  SearchCharactersPageTitle,
  SearchCharactersPageSubtitle,
  SearchCharactersPageSearchBar,
  SearchCharactersPageSearchButton,
  SearchCharactersPageSearchContainerBar,
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
    <SearchCharactersPage data-testid="id-search-characters-page">
      <SearchCharactersPageTitle data-testid="id-search-characters-title">
        Search for your favorite hero
        <SearchCharactersTitleIcon data-testid="id-search-characters-title-icon-container">
          <AiOutlineSearch data-testid="id-search-characters-title-icon" />
        </SearchCharactersTitleIcon>
      </SearchCharactersPageTitle>
      <SearchCharactersPageSubtitle data-testid="id-search-characters-subtitle">
        Find information about your favorite Marvel heroes.
      </SearchCharactersPageSubtitle>
      <SearchCharactersPageSearchContainerBar data-testid="id-search-characters-container">
        <SearchCharactersPageSearchBar
          type="text"
          data-testid="id-search-characters-bar"
          placeholder="Search for your favorite Marvel Hero"
          value={searchValue}
          onKeyDown={handleEnterKeyPress}
          onChange={handleChangeValueSearch}
        />
        <SearchCharactersPageSearchButton
          onClick={handleSearchNavigate}
          data-testid="id-search-characters-button"
        >
          Search
        </SearchCharactersPageSearchButton>
      </SearchCharactersPageSearchContainerBar>
      <SearchCharactersPageFooter data-testid="id-search-characters-page-footer">
        ⚡️ Não julgue o livro pela capa! O design pode não ser de outro mundo,
        mas o código é digno do Multiverso! ✨🚀
      </SearchCharactersPageFooter>
    </SearchCharactersPage>
  );
};
