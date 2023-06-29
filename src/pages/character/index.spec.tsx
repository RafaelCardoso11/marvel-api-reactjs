import { render } from "@testing-library/react";
import { Character } from ".";
import RoutersContextTesting from "@/tests/routers";
import { ICharacters } from "@/interfaces/characters";
import { charactersMock } from "@/mocks/characters";

let charactersMockEmpty: ICharacters = {
  data: {
    results: [],
  }
};

jest.mock("@/hooks/useDataFetcher", () => {
  return {
    useDataFetcher: () => ({
      data: charactersMockEmpty,
    }),
  };
});

describe("<Character />", () => {
  afterEach(() => {
    history.pushState({}, "", "/characters/:id");
  });
  it("Deveria renderizar na tela um container CharacterPage", () => {
    const screen = render(
      <RoutersContextTesting>
        <Character />
      </RoutersContextTesting>
    );

    const CharacterPage = screen.getByTestId("id-character-page");

    expect(CharacterPage).toBeInTheDocument();
  });
  it("Deveria conter na url o parametro ID", () => {
    charactersMockEmpty = charactersMock;
    const idCharacter = charactersMock.data.results[0].id;
    const routerCharacterWithID = `/characters/${idCharacter}`;

    history.pushState({}, "", routerCharacterWithID);

    render(
      <RoutersContextTesting router={{ path: "/characters/:id" }}>
        <Character />
      </RoutersContextTesting>
    );
    expect(window.location.pathname).toMatch(routerCharacterWithID);
  });
  it("Deveria buscar o character a partir do ID do character", () => {
    charactersMockEmpty = charactersMock;
    const idCharacter = charactersMock.data.results[0].id;
    const idRegex = new RegExp(`${idCharacter}`, "i");

    const routerCharacterWithID = `/characters/${idCharacter}`;

    history.pushState({}, "", routerCharacterWithID);

    const screen = render(
      <RoutersContextTesting router={{ path: "/characters/:id" }}>
        <Character />
      </RoutersContextTesting>
    );

    expect(window.location.pathname).toMatch(routerCharacterWithID);
    const idInScreen = screen.getByText(idRegex);
    expect(idInScreen).toBeInTheDocument();
  });
  it("Deveria renderizar na tela ao buscar os characters os componentes CharacterPageImage, CharacterPageContent, CharacterPageName, CharacterPageDetails e CharacterPageDetailsParagraph", () => {
    charactersMockEmpty = charactersMock;
    const screen = render(
      <RoutersContextTesting router={{ path: "/characters/:id" }}>
        <Character />
      </RoutersContextTesting>
    );

    const CharacterPageImage = screen.getByTestId("id-character-page-image");
    const CharacterPageContent = screen.getByTestId(
      "id-character-page-content"
    );
    const CharacterPageName = screen.getByTestId("id-character-name");
    const CharacterPageDetails = screen.getByTestId(
      "id-character-page-details"
    );
    const CharacterPageDetailsParagraph = screen.getByTestId(
      "id-character-description"
    );

    expect(CharacterPageImage).toBeInTheDocument();
    expect(CharacterPageContent).toBeInTheDocument();
    expect(CharacterPageName).toBeInTheDocument();
    expect(CharacterPageDetails).toBeInTheDocument();
    expect(CharacterPageDetailsParagraph).toBeInTheDocument();
  });
  it("Deveria renderizar na tela após buscar por ID PARAM o nome, img, descrição e ID do character", () => {
    charactersMockEmpty = charactersMock;
    const character = charactersMock.data.results[0];

    const routerCharacterWithID = `/characters/${character.id}`;

    history.pushState({}, "", routerCharacterWithID);

    const screen = render(
      <RoutersContextTesting router={{ path: "/characters/:id" }}>
        <Character />
      </RoutersContextTesting>
    );

    const idCharacterParagraph = screen.getByTestId("id-character");
    const characterImage = screen.getByTestId("id-character-page-image");

    const characterName = screen.getByTestId("id-character-name");

    const characterDescription = screen.getByTestId("id-character-description");

    expect(idCharacterParagraph).toBeInTheDocument();
    expect(characterImage).toBeInTheDocument();
    expect(characterName).toBeInTheDocument();
    expect(characterDescription).toBeInTheDocument();

    expect(idCharacterParagraph).toHaveTextContent(character.id.toString());
    expect(characterName).toHaveTextContent(character.name);
    expect(characterDescription).toHaveTextContent(
      character.description.toString()
    );

    const { extension, path } = character.thumbnail;

    const srcCharacter = `${path}.${extension}`;
    const altCharacter = `Image for character ${character.name}`;


    expect(characterImage).toHaveAttribute("src", srcCharacter);
    expect(characterImage).toHaveAttribute("alt", altCharacter);
  });
});
