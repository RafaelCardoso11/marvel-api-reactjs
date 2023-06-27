import { cleanup, render } from "@testing-library/react";
import { Cards } from ".";
import { charactersMock } from "@/mocks/characters";

import RoutersContextTesting from "@/tests/routers";
import { ICharacters } from "@/interfaces/characters";

const charactersMockEmpty: ICharacters = {
  data: {
    results: [],
  },
};

describe("<Cards/>", () => {
  afterEach(cleanup);
  afterAll(() => {
    jest.unmock("@/hooks/useDataFetcher");
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Deveria renderizar na tela um container dos Cards", () => {
    const screen = render(
      <RoutersContextTesting>
        <Cards data={charactersMockEmpty.data} />
      </RoutersContextTesting>
    );
    const cardsContainer = screen.getByTestId("id-cards-container");
    expect(cardsContainer).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(2);
  });
  it("Deveria renderizar na tela um container com cards ao injetar os personagens", () => {
    const screen = render(
      <RoutersContextTesting>
        <Cards data={charactersMock.data} />
      </RoutersContextTesting>
    );
    const cardsContainer = screen.getByTestId("id-cards-container");

    const cards = screen.getAllByTestId("id-cards-content");

    expect(cards.length).toBe(charactersMock.data.results.length);
    expect(cardsContainer).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(3);
  });
});
