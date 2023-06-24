import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/characters";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="characters/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
