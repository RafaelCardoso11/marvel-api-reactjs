import { cleanup, fireEvent, render } from "@testing-library/react";

import * as useDataFetcherModule from "@/hooks/useDataFetcher";
import { renderHook } from "@testing-library/react-hooks";
import { ICardsSearchProps } from "../../interfaces/charactersSearchProps";
import { Cards } from "./index";
import { charactersMock } from "@/mocks/characters";

const charactersMockEmpty: ICardsSearchProps = {
  data: {
    results: [],
  },
};

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
  it.todo("");
});
