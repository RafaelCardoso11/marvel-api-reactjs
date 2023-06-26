import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useEffect, useCallback, useState } from "react";

import { ICardsSearchProps } from "./interfaces/charactersSearchProps";
import { Cards } from "./components/cards";
import { StyledContainer, StyledContainerSearch } from "./styles";
import { isEmpty } from "lodash";
import { Search } from "@/components/search";

export const Characters = () => {
  const [queryParams, setQueryParams] = useState("characters");
  const [valueSearch, setValueSearch] = useState<string>("");

  const { data: characters } = useDataFetcher<ICardsSearchProps>(queryParams);

  const handleSearch = useCallback(() => {
    if (!isEmpty(valueSearch.trim())) {
      setQueryParams("characters?nameStartsWith=" + valueSearch);
    } else {
      setQueryParams("characters");
    }
  }, [valueSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <StyledContainer data-testid="id-container-characters">
      <StyledContainerSearch data-testid="id-container-search-characters">
        <Search setValueAfterWrite={setValueSearch} />
      </StyledContainerSearch>
      {characters?.data.results.length ? (
        <div data-testid="id-cards-characters">
          <Cards data={characters.data} />
        </div>
      ) : (
        "Nenhum personagem encontrado"
      )}
    </StyledContainer>
  );
};
