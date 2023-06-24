import { useDataFetcher } from "@/hooks/useDataFetcher";
import { useState } from "react";

import { ICardsSearchProps } from "./interfaces/cardsSearchProps";
import { Cards } from "./components/cards";
import { StyledContainer, StyledContainerSearch } from "./styles";

export const Characters = () => {
  const [queryParams, setQueryParams] = useState("characters");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: characters } = useDataFetcher<ICardsSearchProps>(queryParams);

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm) {
      setQueryParams("characters?nameStartsWith=" + searchTerm);
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
          value={searchTerm}
          onChange={handleSearch}
        />
      </StyledContainerSearch>
      {characters && <Cards data={characters.data} />}
    </StyledContainer>
  );
};
