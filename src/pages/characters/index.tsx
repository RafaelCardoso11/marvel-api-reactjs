import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useEffect, useCallback, useState } from "react";

import { ICharacters } from "@/interfaces/characters";
import { Cards as CharactersCards } from "./components/cards";
import {
  CharactersContainer,
  CharactersHeaderContainer,
  CharactersNotCharactersContainer,
  CharactersCardsContainer,
} from "./styles";
import { isEmpty } from "lodash";
import { AutoComplete } from "@/components/autoComplete";

export const Characters = () => {
  const [queryParams, setQueryParams] = useState("characters");
  const [valueSearch, setValueSearch] = useState<string>("");
  const [pagination, setPagination] = useState<number>(6);

  const { data: characters } = useDataFetcher<ICharacters>(queryParams);

  const handleSearch = useCallback(() => {
    if (!isEmpty(valueSearch.trim())) {
      setQueryParams(
        `characters?limit=${pagination}&nameStartsWith=${valueSearch}`
      );
    } else {
      setQueryParams(`characters?limit=${pagination}`);
    }
  }, [pagination, valueSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <CharactersContainer data-testid="id-container-characters">
      <CharactersHeaderContainer data-testid="id-container-search-characters">
        <AutoComplete
          setValueAfterWrite={setValueSearch}
          placeholder="Digite para pesquisar o seu Herói da MARVEL favorito."
        />
      </CharactersHeaderContainer>

      {characters?.data.results.length ? (
        <CharactersCardsContainer data-testid="id-cards-characters">
          <CharactersCards
            data={characters.data}
            setPagination={setPagination}
            pagination={pagination}
          />
        </CharactersCardsContainer>
      ) : (
        <CharactersNotCharactersContainer>
          Nenhum personagem encontrado
        </CharactersNotCharactersContainer>
      )}
    </CharactersContainer>
  );
};
