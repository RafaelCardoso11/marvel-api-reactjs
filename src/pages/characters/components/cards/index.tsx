import { ICharacters } from "@/interfaces/characters";
import { Card } from "../card";

import {
  CardsContainer,
  CardsContainerPagination,
  CardsButtonAddPage,
} from "./styles";

export const Cards: React.FC<ICharacters> = ({
  data: { results: characters },
  setPagination,
  pagination,
}) => {
  return (
    <>
      <CardsContainer data-testid="id-cards-container">
        {characters.map((character, index) => (
          <div data-testid="id-cards-content" key={index}>
            <Card character={character} data-testid="teste" />
          </div>
        ))}
      </CardsContainer>
      <CardsContainerPagination>
        {pagination > 3 && (
          <CardsButtonAddPage onClick={() => setPagination((prev) => prev - 3)}>
            Remover
          </CardsButtonAddPage>
        )}
        <CardsButtonAddPage onClick={() => setPagination((prev) => prev + 3)}>
          Adicionar Mais
        </CardsButtonAddPage>
      </CardsContainerPagination>
    </>
  );
};
