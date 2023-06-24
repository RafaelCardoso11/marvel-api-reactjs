import { styled } from "styled-components";

const StyledContainerCards = styled.section`
  display: grid;
  justify-items: center;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 70px 10px;
`;

export { StyledContainerCards };
