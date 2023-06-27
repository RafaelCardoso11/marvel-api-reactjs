import { fireEvent, render } from "@testing-library/react";
import { Search } from "./index";
import { act } from "react-dom/test-utils";

describe("<Search/>", () => {
  jest.useFakeTimers(); // Usar fake timers antes dos testes
  afterEach(() => {
    jest.clearAllTimers(); // Limpar todos os timers
  });

  it("Deveria renderizar na tela o componente Search com um Input", () => {
    const setValueAfterWrite = jest.fn();
    const screen = render(<Search setValueAfterWrite={setValueAfterWrite} />);

    const searchInput = screen.getByTestId("id-search-characters");
    expect(searchInput).toBeInTheDocument();

    expect(screen.container).toMatchSnapshot();
  });
  it("Deveria ser possível buscar", () => {
    const setValueAfterWrite = jest.fn();
    const screen = render(<Search setValueAfterWrite={setValueAfterWrite} />);

    const valueSearch = "teste";
    const searchInput = screen.getByTestId("id-search-characters");

    fireEvent.change(searchInput, {
      target: { value: valueSearch },
    });

    expect(searchInput).toHaveValue(valueSearch);
    expect(screen.container).toMatchSnapshot();
  });
  it("Deveria ser possível buscar de forma Debounce", () => {
    const valueAfterWrite = jest.fn();
    const valueSearch = "teste";

    const screen = render(<Search setValueAfterWrite={valueAfterWrite} />);

    const searchInput = screen.getByTestId("id-search-characters");

    fireEvent.change(searchInput, {
      target: { value: valueSearch },
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(searchInput).toHaveValue(valueSearch);
    expect(valueAfterWrite).toHaveBeenCalledWith(valueSearch);
    expect(screen.container).toMatchSnapshot();
  });
});
