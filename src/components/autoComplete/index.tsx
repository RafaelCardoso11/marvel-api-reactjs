import { useEffect, useState } from "react";
import {
  AutocompleteContainer,
  AutocompleteInput,
  LoadingContainer,
  LoadingIcon,
} from "./styles";
import { IAutoCompleteProps } from "./interface/autoCompleteProps";

export const AutoComplete: React.FC<IAutoCompleteProps> = ({
  setValueAfterWrite,
  placeholder = "Digite para pesquisar",
}) => {
  const [loading, setLoading] = useState(false);
  const [searchCharacters, setSearchCharacters] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCharacters = event.target.value;
    setSearchCharacters(searchCharacters);
  };

  useEffect(() => {
    const milliSeconds = 1000;
    const delayInSeconds = milliSeconds * 1;

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      setValueAfterWrite(searchCharacters);
      setLoading(false);
    }, delayInSeconds);

    return () => clearTimeout(delayDebounce);
  }, [setValueAfterWrite, searchCharacters]);

  return (
    <AutocompleteContainer>
      <AutocompleteInput
        type="text"
        placeholder={placeholder}
        data-testid="id-search-characters"
        value={searchCharacters}
        onChange={handleSearch}
      />
      {loading && (
        <LoadingContainer>
          <LoadingIcon size={20} />
        </LoadingContainer>
      )}
    </AutocompleteContainer>
  );
};
