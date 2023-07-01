import { Characters } from "./index";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { charactersMock } from "@/mocks/characters";
import { ICharacters } from "@/interfaces/characters";
import * as useDataFetcherModule from "@/hooks/useDataFetcher";
import RoutersContextTesting from "@/tests/routers";
import { act } from "react-dom/test-utils";
import { ICharacter } from "@/interfaces/character";
import { Route } from "react-router-dom";

const charactersMockEmpty: ICharacters = {
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
  jest.useFakeTimers(); // Usar fake timers antes dos testes
  afterEach(() => {
    cleanup();
    jest.clearAllTimers(); // Limpar todos os timers
  });

  afterAll(() => {
    jest.unmock("@/hooks/useDataFetcher");
  });
  beforeEach(() => {
    // Resetar o mock antes de cada teste
    mockData.mockRestore();
    mockData.mockClear();

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
    const CharactersHeaderContainerIcon = screen.getByTestId("id-characters-header-icon-container");
    const AiOutlineSearch = screen.getByTestId("id-characters-header-icon");
    const containerSearchCharacters = screen.getByTestId(
      "id-container-search-characters"
    );
    const searchCharacters = screen.getByTestId("id-characters-search");

    expect(containerCharacters).toBeInTheDocument();
    expect(containerSearchCharacters).toBeInTheDocument();
    expect(searchCharacters).toBeInTheDocument();
    expect(CharactersHeaderContainerIcon).toBeInTheDocument();
    expect(AiOutlineSearch).toBeInTheDocument();

    expect(screen.container).toMatchSnapshot();
    expect.assertions(6);
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

    const inputSearchCharacters = screen.getByTestId("id-characters-search");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.input(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    act(() => {
      jest.runAllTimers();
    });

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICharacters>("")
    );

    const filterCharacterFromName = result.current.data.data.results.filter(
      ({ name }: ICharacter) =>
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
  it("Deveria buscar a partir da inicial do nome dos personagens", async () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });

    const valueNameSearch = "H";

    const screen = render(
      <RoutersContextTesting>
        <Characters />
      </RoutersContextTesting>
    );

    const inputSearchCharacters = screen.getByTestId("id-characters-search");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.change(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    act(() => {
      jest.runAllTimers();
    });

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICharacters>("")
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

    const inputSearchCharacters = screen.getByTestId("id-characters-search");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.change(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    act(() => {
      jest.runAllTimers();
    });

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICharacters>("")
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

    const inputSearchCharacters = screen.getByTestId("id-characters-search");

    expect(inputSearchCharacters).toBeInTheDocument();

    fireEvent.change(inputSearchCharacters, {
      target: {
        value: valueNameSearch,
      },
    });
    expect(inputSearchCharacters).toHaveValue(valueNameSearch);

    act(() => {
      jest.runAllTimers();
    });
    expect(mockData).toHaveBeenCalledTimes(4);

    const { result, rerender } = renderHook(() =>
      useDataFetcherModule.useDataFetcher<ICharacters>("")
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
      /No characters found./i
    );

    expect(result.current.data).toEqual(charactersMockEmpty);
    expect(messageSearchNotFind).toBeInTheDocument();
    expect(screen.container).toMatchSnapshot();
    expect.assertions(6);
  });
  it("Deveria navegar para a home a clicar no icone CharactersHeaderContainerIcon", () => {
    mockData.mockReturnValue({
      data: charactersMock,
    });

    const pathCharacters = '/characters'
    const textNewRouter = 'Router /'
    history.pushState({}, '', pathCharacters)

    const screen = render(
      <RoutersContextTesting router={{
        path: pathCharacters
      }} routes={[<Route path="/" element={<>{textNewRouter}</>}  key={1}/>]}>
        <Characters />
      </RoutersContextTesting>
    );


    const CharactersHeaderContainerIcon = screen.getByTestId(
      "id-characters-header-icon-container"
    );
    fireEvent.click(CharactersHeaderContainerIcon)
    expect(window.location.pathname).toBe('/')
    
    const newRouter = screen.getByText(textNewRouter)
    expect(newRouter).toBeInTheDocument()
  });
});
