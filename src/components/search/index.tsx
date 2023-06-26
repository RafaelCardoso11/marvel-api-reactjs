import { useEffect, useState } from "react";
import { StyledInputSearch } from "./styles";
import { ISearchProps } from "./interface/searchProps";

export const Search: React.FC<ISearchProps> = ({ setValueAfterWrite }) => {
  const [searchCharacters, setSearchCharacters] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCharacters = event.target.value;
    setSearchCharacters(searchCharacters);
  };

  useEffect(() => {
    const milliSeconds = 1000;
    const delayInSeconds = milliSeconds * 1;

    const delayDebounce = setTimeout(() => {
      setValueAfterWrite(searchCharacters);
    }, delayInSeconds);

    return () => clearTimeout(delayDebounce);
  }, [setValueAfterWrite, searchCharacters]);

  return (
    <StyledInputSearch
      type="text"
      placeholder="Pesquisar..."
      data-testid="id-search-characters"
      value={searchCharacters}
      onChange={handleSearch}
    />
  );
};
