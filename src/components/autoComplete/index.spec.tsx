import { fireEvent, render } from "@testing-library/react";
import { AutoComplete } from "./index";
import { act } from "react-dom/test-utils";
import { IAutoCompleteProps } from "./interface/autoCompleteProps";

const AutoCompleteProps: IAutoCompleteProps = {
  handleAfterBounced: jest.fn(),
  setValueAfterWrite: jest.fn(),
  setValueSearch: jest.fn(),
  value: "",
  placeholder: "",
};

describe("<AutoComplete/>", () => {
  jest.useFakeTimers(); // Usar fake timers antes dos testes
  afterEach(() => {
    jest.clearAllTimers(); // Limpar todos os timers
  });

  it("Deveria renderizar na tela o componente Search com um Input", () => {
    const screen = render(<AutoComplete {...AutoCompleteProps} />);

    const searchInput = screen.getByTestId("id-search-characters");
    expect(searchInput).toBeInTheDocument();

    expect(screen.container).toMatchSnapshot();
  });
  it("Deveria ser possível buscar", () => {
    const setValueAfterWrite = jest.fn();
    const valueSearch = "test";

    let value = "";
    const setValue = jest.fn((valueRef) => {
      value = valueRef;
    });

    const screen = render(
      <AutoComplete
        {...AutoCompleteProps}
        setValueSearch={setValue}
        setValueAfterWrite={setValueAfterWrite}
        value={value}
      />
    );
    const searchInput = screen.getByTestId("id-search-characters");

    fireEvent.change(searchInput, {
      target: { value: valueSearch },
    });
    
    expect(setValueAfterWrite).toHaveBeenCalled();

    expect(searchInput).toHaveValue(valueSearch);
    expect(screen.container).toMatchSnapshot();
  });
  it("Deveria ser possível buscar de forma Debounce", () => {
    const valueAfterWrite = jest.fn();
    const valueSearch = "teste";

    const screen = render(
      <AutoComplete
        {...AutoCompleteProps}
        setValueAfterWrite={valueAfterWrite}
      />
    );

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
