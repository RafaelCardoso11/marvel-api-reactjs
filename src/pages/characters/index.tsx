import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useState } from "react";

import { ICardsSearchProps } from "./interfaces/cardsSearchProps";
import { Cards } from "./components/cards";
import { StyledContainer, StyledContainerSearch } from "./styles";

export const Characters = () => {
  const [queryParams, setQueryParams] = useState("characters");
  const [searchCharacters, setSearchCharacters] = useState<string>("");
  const { data: characters } = useDataFetcher<ICardsSearchProps>(queryParams);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCharacters = event.target.value;
    setSearchCharacters(searchCharacters);
    if (searchCharacters) {
      setQueryParams("characters?nameStartsWith=" + searchCharacters);
    } else {
      setQueryParams("characters");
    }
  };

  return (
    <StyledContainer>
      <StyledContainerSearch>
        <input
          type="text"
          placeholder="Pesquisar..."
          data-testid=""
          value={searchCharacters}
          onChange={handleSearch}
        />
      </StyledContainerSearch>
      {characters && <Cards data={characters.data} />}
    </StyledContainer>
  );
};
