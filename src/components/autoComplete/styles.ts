import styled, { keyframes } from "styled-components";
import { AiOutlineLoading } from "react-icons/ai";

const AutocompleteContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  padding: 4px;
  background-color: #3B3B3B;

`;

const AutocompleteInput = styled.input`
  flex: 1;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;

  outline: none;
  font-size: 16px;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingIcon = styled(AiOutlineLoading)`
  animation: ${rotateAnimation} 1s linear infinite;
`;

const LoadingContainer = styled.div`
  margin-left: 4px;
  border-radius: 50%;
  padding: 4px;
`;

export {
  AutocompleteContainer,
  AutocompleteInput,
  LoadingIcon,
  LoadingContainer,
};
