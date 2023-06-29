import { styled } from "styled-components";

const CardsContainer = styled.section`
  display: grid;
  justify-items: center;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 20px 10px;
`;

const CardContainer = styled.button`
  background-color: #ff9000;
`;

export { CardsContainer, CardContainer };
