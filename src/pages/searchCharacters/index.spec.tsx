import RoutersContextTesting from "@/tests/routers";
import { SearchCharacters } from ".";
import { render } from "@testing-library/react";

describe("<SearchCharacters />", () => {
  it("Deveria renderizar na tela um container CharacterPage", () => {
    render(
      <RoutersContextTesting>
        <SearchCharacters />
      </RoutersContextTesting>
    );
  });
});
