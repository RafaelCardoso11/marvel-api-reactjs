import { ChangeEvent, useState } from "react";
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
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/characters?nameStartsWith=" + searchValue);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
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
          onChange={handleChange}
        />
        <SearchCharactersPageSearchButton onClick={handleSearch}>
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
