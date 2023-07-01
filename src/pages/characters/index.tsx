import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useEffect, useCallback, useState } from "react";

import { ICharacters } from "@/interfaces/characters";
import { Cards as CharactersCards } from "./components/cards";
import {
  CharactersContainer,
  CharactersHeaderContainer,
  CharactersNotCharactersContainer,
  CharactersCardsContainer,
  CharactersHeaderContainerIcon,
} from "./styles";
import { isEmpty } from "lodash";
import { AutoComplete } from "@/components/autoComplete";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
const PARAM_KEY_NAME_STARTS = "nameStartsWith";

export const Characters = () => {
  const [queryParams, setQueryParams] = useState("characters");
  const [valueSearch, setValueSearch] = useState<string>("");
  const { search } = useLocation();
  const navigate = useNavigate();

  const { data: characters } = useDataFetcher<ICharacters>(queryParams);

  const handleAfterBounced = useCallback(
    (valueSearch: string) => {
      navigate(`?${PARAM_KEY_NAME_STARTS}=` + valueSearch);
    },
    [navigate]
  );

  const handleNavigateForHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const query = new URLSearchParams(search);
    const getParamNameStarts = query.get(PARAM_KEY_NAME_STARTS);
    if (!isEmpty(getParamNameStarts)) {
      setValueSearch(getParamNameStarts as string);
      setQueryParams(
        `characters?${PARAM_KEY_NAME_STARTS}=${getParamNameStarts}`
      );
    }
  }, [search]);

  return (
    <CharactersContainer data-testid="id-container-characters">
      <CharactersHeaderContainer data-testid="id-container-search-characters">
        <CharactersHeaderContainerIcon
          onClick={handleNavigateForHome}
          data-testid="id-characters-header-icon-container"
        >
          <AiOutlineSearch data-testid="id-characters-header-icon" />
        </CharactersHeaderContainerIcon>
        <AutoComplete
          value={valueSearch}
          setValueSearch={setValueSearch}
          handleAfterBounced={handleAfterBounced}
          testID="id-characters-search"
          placeholder="Search for your favorite Marvel Hero"
        />
      </CharactersHeaderContainer>

      {characters?.data.results.length ? (
        <CharactersCardsContainer data-testid="id-cards-characters">
          <CharactersCards data={characters.data} />
        </CharactersCardsContainer>
      ) : (
        <CharactersNotCharactersContainer>
          No characters found. Keep searching, your hero is out there! 🦸‍♂️🔍
        </CharactersNotCharactersContainer>
      )}
    </CharactersContainer>
  );
};
