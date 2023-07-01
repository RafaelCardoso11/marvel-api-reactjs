import RoutersContextTesting from "@/tests/routers";
import { SearchCharacters } from ".";
import { fireEvent, render, within } from "@testing-library/react";
import { Route } from "react-router-dom";

describe("<SearchCharacters />", () => {
  afterEach(() => {
    history.pushState({}, '', '/')
  })
  it("Deveria renderizar na tela os containers SearchCharactersPage, SearchCharactersPageTitle, SearchCharactersTitleIcon, SearchCharactersPageSearchContainer, SearchCharactersPageFooter", () => {
    const screen = render(
      <RoutersContextTesting>
        <SearchCharacters />
      </RoutersContextTesting>
    );

    const SearchCharactersPage = screen.getByTestId(
      "id-search-characters-page"
    );
    const SearchCharactersPageTitle = screen.getByTestId(
      "id-search-characters-title"
    );
    const SearchCharactersTitleIcon = screen.getByTestId(
      "id-search-characters-title-icon"
    );
    const SearchCharactersTitleIconContainer = screen.getByTestId(
      "id-search-characters-title-icon-container"
    );
    const SearchCharactersPageSubtitle = screen.getByTestId(
      "id-search-characters-subtitle"
    );
    const SearchCharactersPageSearchContainerBar = screen.getByTestId(
      "id-search-characters-container"
    );
    const SearchCharactersPageSearchBar = screen.getByTestId(
      "id-search-characters-bar"
    );
    const SearchCharactersPageSearchButton = screen.getByTestId(
      "id-search-characters-button"
    );
    const SearchCharactersPageFooter = screen.getByTestId(
      "id-search-characters-page-footer"
    );

    expect(SearchCharactersPage).toBeInTheDocument();
    expect(SearchCharactersPageTitle).toBeInTheDocument();
    expect(SearchCharactersTitleIconContainer).toBeInTheDocument();
    expect(SearchCharactersTitleIcon).toBeInTheDocument();
    expect(SearchCharactersPageSubtitle).toBeInTheDocument();
    expect(SearchCharactersPageSearchContainerBar).toBeInTheDocument();
    expect(SearchCharactersPageSearchBar).toBeInTheDocument();
    expect(SearchCharactersPageSearchButton).toBeInTheDocument();
    expect(SearchCharactersPageFooter).toBeInTheDocument();

    expect(screen.container).toMatchSnapshot();
    expect.assertions(10);
  });
  it("Deveria conter no titulo o Texto 'Search for your favorite hero e um Icon de Search'", () => {
    const screen = render(
      <RoutersContextTesting>
        <SearchCharacters />
      </RoutersContextTesting>
    );

    const SearchCharactersPageTitle = screen.getByTestId(
      "id-search-characters-title"
    );

    const iconInTitle = within(SearchCharactersPageTitle).getByTestId(
      "id-search-characters-title-icon"
    );
    expect(SearchCharactersPageTitle).toHaveTextContent(
      /Search for your favorite hero/i
    );
    expect(iconInTitle).toBeInTheDocument();
  });
  it("Deveria conter em tela um subtitle com o texto 'Find information about your favorite Marvel heroes.'", () => {
    const screen = render(
      <RoutersContextTesting>
        <SearchCharacters />
      </RoutersContextTesting>
    );

    const SearchCharactersPageSubTitle = screen.getByTestId(
      "id-search-characters-subtitle"
    );
    expect(SearchCharactersPageSubTitle).toHaveTextContent(
      /Find information about your favorite Marvel heroes./i
    );
  });
  it("Deveria conter em tela um Footer com o texto '⚡️ Não julgue o livro pela capa! O design pode não ser de outro mundo, mas o código é digno do Multiverso! ✨🚀'", () => {
    const screen = render(
      <RoutersContextTesting>
        <SearchCharacters />
      </RoutersContextTesting>
    );

    const SearchCharactersPageFooter = screen.getByTestId(
      "id-search-characters-page-footer"
    );
    expect(SearchCharactersPageFooter).toHaveTextContent(
      /⚡️ Não julgue o livro pela capa! O design pode não ser de outro mundo, mas o código é digno do Multiverso! ✨🚀/i
    );
  });
  it("Deveria ser possível buscar os personagens. Ao buscar deve redirecionar para outra tela", () => {
    jest.clearAllMocks();
    const valueSearch = "hulk";
    const pathSearchCharacters = "/";

    const searchSucess = "Buscou com sucesso";
    const screen = render(
      <RoutersContextTesting
        routes={[
          <Route
            path={`/characters`}
            element={<>{searchSucess}</>}
            key={valueSearch}
          />,
        ]}
      >
        <SearchCharacters />
      </RoutersContextTesting>
    );
    const SearchCharactersPageSearchBar = screen.getByTestId(
      "id-search-characters-bar"
    );
    const SearchCharactersPageSearchButton = screen.getByTestId(
      "id-search-characters-button"
    );

    expect(window.location.pathname).toBe(pathSearchCharacters);

    fireEvent.change(SearchCharactersPageSearchBar, {
      target: { value: valueSearch },
    });

    expect(SearchCharactersPageSearchBar).toHaveValue(valueSearch);

    fireEvent.click(SearchCharactersPageSearchButton);
    expect(window.location.pathname).not.toBe(pathSearchCharacters);
    expect(screen.container).toContainHTML(searchSucess);
    expect(screen.container).toMatchSnapshot();
    expect.assertions(5);
  });
  it("Deveria ao pesquisar e clicar no Botão de pesquisa navegar para a URL dos personagens com o inicial ou nome dos personagens por parametro", async () => {
    const valueSearch = "Hu";
    const pathCharacters = "/characters";
    const pathCharacterWithParamNameStarts =
      pathCharacters + "?nameStartsWith=" + valueSearch;

    const screen = render(
      <RoutersContextTesting
        routes={[
          <Route
            path={pathCharacters}
            element={<div>Characters Page 1</div>}
            key={1}
          />,
        ]}
      >
        <SearchCharacters />
      </RoutersContextTesting>
    );

    const SearchCharactersPageSearchBar = screen.getByTestId(
      "id-search-characters-bar"
    );
    const SearchCharactersPageSearchButton = screen.getByTestId(
      "id-search-characters-button"
    );

    expect(window.location.href).not.toMatch(pathCharacterWithParamNameStarts);

    fireEvent.change(SearchCharactersPageSearchBar, {
      target: { value: valueSearch },
    });

    expect(SearchCharactersPageSearchBar).toHaveValue(valueSearch);

    fireEvent.click(SearchCharactersPageSearchButton);

    expect(window.location.href).toMatch(pathCharacterWithParamNameStarts);
    expect(screen.container).toMatchSnapshot();
    expect.assertions(4);
  });
  it("Deveria ao pesquisar e pressionar a tecla Enter fazer a navegação para a URL dos personagens", () => {
    const valueSearch = "Hu";
    const pathCharacters = "/characters";
    const pathCharacterWithParamNameStarts =
      pathCharacters + "?nameStartsWith=" + valueSearch;

    const screen = render(
      <RoutersContextTesting
        routes={[
          <Route
            path={pathCharacters}
            element={<div>Characters Page 2</div>}
            key={pathCharacters}
          />,
        ]}
      >
        <SearchCharacters />
      </RoutersContextTesting>
    );

    const SearchCharactersPageSearchBar = screen.getByTestId(
      "id-search-characters-bar"
    );

    expect(window.location.href).not.toMatch(pathCharacterWithParamNameStarts);

    fireEvent.change(SearchCharactersPageSearchBar, {
      target: { value: valueSearch },
    });

    expect(SearchCharactersPageSearchBar).toHaveValue(valueSearch);

    fireEvent.keyDown(SearchCharactersPageSearchBar, { key: "Enter", code: "Enter" });

    expect(window.location.href).toMatch(pathCharacterWithParamNameStarts);
    expect(screen.container).toMatchSnapshot();
    expect.assertions(4);
  });
});
