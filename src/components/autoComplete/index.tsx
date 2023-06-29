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
  placeholder = "Search...",
  value = "",
  handleAfterBounced,
  setValueSearch,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCharacters = event.target.value;
    setValueSearch(searchCharacters);
  };

  useEffect(() => {
    const milliSeconds = 1000;
    const delayInSeconds = milliSeconds * 1;

    setLoading(true);
    const delayDebounce = setTimeout(() => {
      setValueAfterWrite(value);
      setLoading(false);
      handleAfterBounced();
    }, delayInSeconds);


    return () => clearTimeout(delayDebounce);
  }, [handleAfterBounced, setValueAfterWrite, value]);

  return (
    <AutocompleteContainer>
      <AutocompleteInput
        type="text"
        placeholder={placeholder}
        data-testid="id-search-characters"
        value={value}
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
