import { ICharacter } from "./character";

export interface ICharacters {
  data: {
    results: ICharacter[];
  };
  pagination: number;
  setPagination: React.Dispatch<React.SetStateAction<number>>;
}
