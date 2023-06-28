import { styled } from "styled-components";

const CardsContainer = styled.section`
  display: grid;
  justify-items: center;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 20px 10px;
`;

const CardsContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100px;
  background-color: #242424;
`;

const CardsButtonAddPage = styled.button`
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #242424;
`;

export { CardsContainer, CardsContainerPagination, CardsButtonAddPage };
