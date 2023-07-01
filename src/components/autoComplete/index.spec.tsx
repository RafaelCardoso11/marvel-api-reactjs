import { fireEvent, render } from "@testing-library/react";
import { AutoComplete } from "./index";
import { act } from "react-dom/test-utils";
import { IAutoCompleteProps } from "./interface/autoCompleteProps";

const AutoCompleteProps: IAutoCompleteProps = {
  handleAfterBounced: jest.fn(),
  setValueSearch: jest.fn(),
  value: "",
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
    const handleAfterBounced = jest.fn();
    const valueSearch = "test";

    const setValue = jest.fn((valueRef) => {
      screen.rerender(
        <AutoComplete
          {...AutoCompleteProps}
          setValueSearch={setValue}
          handleAfterBounced={handleAfterBounced}
          value={valueRef}
        />
      );
    });
    const screen = render(
      <AutoComplete
        {...AutoCompleteProps}
        setValueSearch={setValue}
        handleAfterBounced={handleAfterBounced}
        value={""}
      />
    );

    const searchInput = screen.getByTestId("id-search-characters");
    fireEvent.change(searchInput, {
      target: { value: valueSearch },
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(handleAfterBounced).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalled();

    expect(searchInput).toHaveValue(valueSearch);
    expect(screen.container).toMatchSnapshot();
  });
  it("Deveria ser possível buscar de forma Debounce", () => {
    const handleAfterBounced = jest.fn();
    const valueSearch = "teste";


    const setValue = jest.fn((valueRef) => {
      screen.rerender(
        <AutoComplete
          {...AutoCompleteProps}
          setValueSearch={setValue}
          handleAfterBounced={handleAfterBounced}
          value={valueRef}
        />
      );
    });

    const screen = render(
      <AutoComplete
        {...AutoCompleteProps}
        setValueSearch={setValue}
        handleAfterBounced={handleAfterBounced}
        value={""}
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
    expect(handleAfterBounced).toHaveBeenCalledWith(valueSearch);
    expect(screen.container).toMatchSnapshot();
  });
});
