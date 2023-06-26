import { Characters } from "./index";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { charactersMock } from "@/mocks/characters";
import { ICardsSearchProps } from "./interfaces/charactersSearchProps";
import * as useDataFetcherModule from "@/hooks/useDataFetcher";
import RoutersContextTesting from "@/tests/routers";

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

describe("<Characters/>", () => {
  afterEach(cleanup);
  afterAll(() => {
    jest.unmock("@/hooks/useDataFetcher");
  });
  beforeEach(() => {
    // Resetar o mock antes de cada teste
    mockData.mockRestore();
    jest.clearAllMocks();
  });
  it("Deveria renderizar na tela os componentes container-characters, container-search-characters e searchCharacters", () => {
    mockData.mockReturnValue({
      data: charactersMockEmpty,
    });
    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );
    const containerCharacters = screen.getByTestId("id-container-characters");
    const containerSearchCharacters = screen.getByTestId(
      "id-container-search-characters"
    );
    const searchCharacters = screen.getByTestId("id-search-characters");

    expect(containerCharacters).toBeInTheDocument();
    expect(containerSearchCharacters).toBeInTheDocument();
    expect(searchCharacters).toBeInTheDocument();

    expect(screen.container).toMatchSnapshot();
    expect.assertions(4);
  });
  it("Deveria buscar os characters ao renderizar a aplicação", async () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });
    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const useDataFetcherMock = jest.spyOn(
      useDataFetcherModule,
      "useDataFetcher"
    );

    const { result } = renderHook(() =>
      useDataFetcherModule.useDataFetcher("")
    );

    expect(useDataFetcherMock).toHaveBeenCalled();
    expect(result.current.data).toEqual(charactersMock);
    expect(screen.container).toMatchSnapshot();

    expect.assertions(3);
  });
  it("Deveria buscar os characters e listalos em cards na tela caso tenha characters", async () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });

    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const { result } = renderHook(() =>
      useDataFetcherModule.useDataFetcher("")
    );

    expect(result.current.data).toEqual(charactersMock);

    const containerCardsCharacters = await screen.findByTestId(
      "id-cards-characters"
    );

    const imgsInScreen = screen.getAllByRole("img");

    expect(imgsInScreen.length).toBe(charactersMock.data.results.length);
    expect(containerCardsCharacters).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(4);
  });
  it("Deveria buscar a partir do nome dos personagens", async () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });

    const valueNameSearch = "Hulk";

    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const inputSearchCharacters = screen.getByTestId("id-search-characters");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.input(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICardsSearchProps>("")
    );

    const filterCharacterFromName = result.current.data.data.results.filter(
      ({ name }) =>
        name.toLocaleLowerCase().includes(valueNameSearch.toLocaleLowerCase())
    );
    const dataWithCharactersSearch = {
      data: {
        results: filterCharacterFromName,
      },
    };

    mockData.mockReturnValue({
      data: dataWithCharactersSearch,
    });

    screen.rerender(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );
    rerender();

    const cardHulk = screen.getByText("Hulk");
    const imgsInScreen = screen.getAllByRole("img");

    expect(cardHulk).toBeInTheDocument();
    expect(imgsInScreen.length).toBe(1);

    expect(screen.container).toMatchSnapshot();
    expect.assertions(5);
  });
  it("Deveria buscar a partir da inicial do nome dos personagens", () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });

    const valueNameSearch = "H";

    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const inputSearchCharacters = screen.getByTestId("id-search-characters");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.input(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICardsSearchProps>("")
    );

    const filterCharacterFromName = result.current.data.data.results.filter(
      ({ name }) =>
        name.toLocaleLowerCase().includes(valueNameSearch.toLocaleLowerCase())
    );

    const dataWithCharactersSearch = {
      data: {
        results: filterCharacterFromName,
      },
    };

    mockData.mockReturnValue({
      data: dataWithCharactersSearch,
    });

    rerender();
    screen.rerender(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const cardHulk = screen.getByText("Hulk");
    const imgsInScreen = screen.getAllByRole("img");

    expect(cardHulk).toBeInTheDocument();
    expect(imgsInScreen.length).toBe(1);
    expect(screen.container).toMatchSnapshot();
    expect.assertions(5);
  });
  it("Deveria buscar todos os personagens caso a busca seja vazia", () => {
    mockData.mockReturnValue({
      data: charactersMockEmpty,
    });

    const valueNameSearch = " ";

    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const inputSearchCharacters = screen.getByTestId("id-search-characters");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.change(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICardsSearchProps>("")
    );

    mockData.mockReturnValue({
      data: charactersMock,
    });

    screen.rerender(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );
    rerender();

    const cardHulk = screen.getByText("Hulk");
    const imgsInScreen = screen.getAllByRole("img");

    expect(result.current.data).toEqual(charactersMock);
    expect(cardHulk).toBeInTheDocument();
    expect(imgsInScreen.length).toBe(charactersMock.data.results.length);
    expect(screen.container).toMatchSnapshot();
    expect.assertions(6);
  });
  it("Deveria ao buscar um characters que não existe mostrar uma mensagem que não foi encontrado", () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });

    const valueNameSearch = "batman";

    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const inputSearchCharacters = screen.getByTestId("id-search-characters");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.change(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICardsSearchProps>("")
    );

    mockData.mockReturnValue({
      data: charactersMockEmpty,
    });

    screen.rerender(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );
    rerender();

    const messageSearchNotFind = screen.getByText(
      /Nenhum personagem encontrado/i
    );

    expect(result.current.data).toEqual(charactersMockEmpty);
    expect(messageSearchNotFind).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(5);
  });
});
