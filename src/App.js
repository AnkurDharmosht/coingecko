import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinsList from "./pages/CoinsList";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CoinsList />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
          <Route path="*" element={<CoinsList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
