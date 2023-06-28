import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useEffect, useCallback, useState } from "react";

import { ICharacters } from "@/interfaces/characters";
import { Cards } from "./components/cards";
import { StyledContainer, CharactersPageHeaderContainer } from "./styles";
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
    <StyledContainer data-testid="id-container-characters">
      <CharactersPageHeaderContainer data-testid="id-container-search-characters">
        <AutoComplete
          setValueAfterWrite={setValueSearch}
          placeholder="Digite para pesquisar o seu Herói da MARVEL favorito."
        />
      </CharactersPageHeaderContainer>

      {characters?.data.results.length ? (
        <div data-testid="id-cards-characters">
          <Cards
            data={characters.data}
            setPagination={setPagination}
            pagination={pagination}
          />
        </div>
      ) : (
        <div>Nenhum personagem encontrado</div>
      )}
    </StyledContainer>
  );
};
