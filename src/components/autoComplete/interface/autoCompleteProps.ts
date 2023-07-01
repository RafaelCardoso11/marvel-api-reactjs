export interface IAutoCompleteProps {
  placeholder?: string;
  value: string;
  setValueSearch: React.Dispatch<React.SetStateAction<string>>;
  handleAfterBounced: (param : any) => void;
  testID?: string
}
