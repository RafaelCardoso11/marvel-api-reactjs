import { render } from "@testing-library/react";
import { Search } from "./index";

describe("<Search/>", () => {
  it("Deveria renderizar na tela o componente Search com um Input", () => {
    const setValueAfterWrite = jest.fn();
    const screen = render(<Search setValueAfterWrite={setValueAfterWrite} />);

    const searchInput = screen.getByTestId("id-search-characters");
    expect(searchInput).toBeInTheDocument();

    expect(screen.container).toMatchSnapshot();
  });
  it.todo("Deveria ser possível buscar");
  it.todo("Deveria ser possível buscar de forma Debounce");
});
 