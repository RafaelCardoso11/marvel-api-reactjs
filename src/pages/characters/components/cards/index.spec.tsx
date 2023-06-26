import { cleanup, render } from "@testing-library/react";
import { Cards } from ".";
import { charactersMock } from "@/mocks/characters";
import { ICardsSearchProps } from "../../interfaces/charactersSearchProps";

const charactersMockEmpty: ICardsSearchProps = {
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
    const screen = render(<Cards data={charactersMockEmpty.data} />);
    const cardsContainer = screen.getByTestId("id-cards-container");
    expect(cardsContainer).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(2);
  });
  it("Deveria renderizar na tela um container com cards ao injetar os personagens", () => {
    const screen = render(<Cards data={charactersMock.data} />);
    const cardsContainer = screen.getByTestId("id-cards-container");

    const cards = screen.getAllByTestId("id-cards-content");

    expect(cards.length).toBe(charactersMock.data.results.length);
    expect(cardsContainer).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(3);
  });
});
