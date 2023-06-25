import { cleanup } from "@testing-library/react";

const mockData = jest.fn();

jest.mock("@/hooks/useDataFetcher", () => {
  return {
    useDataFetcher: () => {
      return mockData();
    },
  };
});

describe("<Cards/>", () => {
  afterEach(cleanup);
  afterAll(() => {
    jest.unmock("@/hooks/useDataFetcher");
  });
  beforeEach(() => {
    mockData.mockRestore();
    jest.clearAllMocks();
  });
  it.todo("Deveria renderizar na tela o id-cards-container e os cards");
  it.todo("Deveria renderizar na tela os cards ao informar os personagens");
  it.todo("Deveria renderizar os cards com a imagem e nome dos personagens");
});
