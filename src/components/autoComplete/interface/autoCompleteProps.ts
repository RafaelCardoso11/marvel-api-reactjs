export interface IAutoCompleteProps {
  setValueAfterWrite: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  value: string;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
  handleAfterBounced: () => void;
}
