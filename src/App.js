import Pokemons from "./components/Pokemons";
import Collections from "./components/Collections";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav className="flex justify-between sticky top-0 z-20 bg-orange-600">
          <ul className="flex flow-row">
            <button className="mx-2 text-white font-bold">
              <Link to="/">Pokemons</Link>
            </button>
            <button className="mx-2 text-white font-bold">
              <Link to="/collections">Collections</Link>
            </button>
          </ul>
        </nav>

        <Routes>
          <Route path="/collections" element={<Collections />} />

          <Route
            path="/"
            element={
              <div className="flex justify-center">
                <Pokemons />
              </div>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
