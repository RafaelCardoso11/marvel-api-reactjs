import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Characters } from "./pages/characters";
import { Character } from "./pages/character";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="characters/:id"  element={<Character />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
