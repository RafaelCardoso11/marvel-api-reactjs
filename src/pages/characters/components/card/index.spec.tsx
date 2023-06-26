import { cleanup, fireEvent, render } from "@testing-library/react";
import { Card } from ".";
import { charactersMock } from "@/mocks/characters";
import RoutersContextTesting from "@/tests/routers";
import { Route } from "react-router-dom";

describe("<Cards/>", () => {
  afterEach(cleanup);
  afterAll(() => {
    jest.unmock("@/hooks/useDataFetcher");
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Deveria renderizar na tela um container card, texto do name e imagem do card", () => {
    const screen = render(
      <RoutersContextTesting>
        <Card characters={charactersMock.data.results[0]} />
      </RoutersContextTesting>
    );
    const cardsContainer = screen.getByTestId("id-card-container");
    const typographNameCard = screen.getByTestId("id-typograph-name-content");
    const imgCardCharacter = screen.getByTestId("id-img-content");

    expect(cardsContainer).toBeInTheDocument();
    expect(typographNameCard).toBeInTheDocument();
    expect(imgCardCharacter).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(4);
  });

  it("Deveria renderizar a imagem e nome do personagem ao injeta-lo por props", () => {
    const oneCharactersForCharactersMock = charactersMock.data.results[0];
    const screen = render(
      <RoutersContextTesting>
        <Card characters={oneCharactersForCharactersMock} />
      </RoutersContextTesting>
    );
    const cardsContainer = screen.getByTestId("id-card-container");
    const typographNameCard = screen.getByTestId("id-typograph-name-content");
    const imgCardCharacter = screen.getByTestId("id-img-content");

    expect(cardsContainer).toBeInTheDocument();
    expect(typographNameCard).toBeInTheDocument();
    expect(imgCardCharacter).toBeInTheDocument();

    const {
      name,
      thumbnail: { extension, path },
    } = oneCharactersForCharactersMock;
    const srcCharacter = `${path}.${extension}`;
    const altCharacter = `Imagem do personagem ${name}`;

    expect(typographNameCard).toHaveTextContent(name);

    expect(imgCardCharacter).toHaveAttribute("src", srcCharacter);
    expect(imgCardCharacter).toHaveAttribute("alt", altCharacter);

    expect(screen.container).toMatchSnapshot();
    expect.assertions(7);
  });
  it("Deveria redirecionar para a página de informações do personagem ao clicar no card ", () => {
    const textInPageInfo = "Página de informações";
    const oneCharactersForCharactersMock = charactersMock.data.results[0];
    const { id } = oneCharactersForCharactersMock;

    const screen = render(
      <RoutersContextTesting
        routes={[
          <Route
            path={`/characters/${id}`}
            element={<>{textInPageInfo}</>}
            key={id}
          />,
        ]}
      >
        <Card characters={oneCharactersForCharactersMock} />
      </RoutersContextTesting>
    );

    const card = screen.getByTestId("id-card-container");

    fireEvent.click(card);

    
    expect(window.location.pathname).toBe(`/characters/${id}`);
    
    const pageInfo = screen.getByText(textInPageInfo) 
    expect(window.location.pathname).toBe(`/characters/${id}`);
    expect(pageInfo).toBeInTheDocument()
    expect.assertions(3);
  });
});
