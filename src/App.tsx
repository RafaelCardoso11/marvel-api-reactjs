import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Characters } from "./pages/characters";
import { Character } from "./pages/character";
import { SearchCharacters } from "./pages/searchCharacters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchCharacters />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="characters/:id"  element={<Character />} />
        <Route path="*" element={<SearchCharacters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
