import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Characters } from "./pages/characters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="characters/:id" element={<Characters />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
