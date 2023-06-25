import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useState } from "react";

import { ICardsSearchProps } from "./interfaces/charactersSearchProps";
import { Cards } from "./components/cards";
import { StyledContainer, StyledContainerSearch } from "./styles";
import { isEmpty } from "lodash";

export const Characters = () => {
  const [queryParams, setQueryParams] = useState("characters");
  const [searchCharacters, setSearchCharacters] = useState<string>("");
  const { data: characters } = useDataFetcher<ICardsSearchProps>(queryParams);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCharacters = event.target.value;
    setSearchCharacters(searchCharacters);

    if (!isEmpty(searchCharacters.trim())) {
      setQueryParams("characters?nameStartsWith=" + searchCharacters);
    } else {
      setQueryParams("characters");
    }
  };

  return (
    <StyledContainer data-testid="id-container-characters">
      <StyledContainerSearch data-testid="id-container-search-characters">
        <input
          type="text"
          placeholder="Pesquisar..."
          data-testid="id-search-characters"
          value={searchCharacters}
          onChange={handleSearch}
        />
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
