import { useState } from "react";
import Pokemons from "./components/Pokemons";
import Collections from "./components/Collections";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

function App() {
  const [collections, setCollections] = useState([]);
  // collection looks like this:
  // {
  //   id: "1",
  //   name: "My collection",
  //   pokemons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // }
  const addToCollections = (collection) => {
    setCollections([...collections, collection]);
  };

  const removeFromCollections = (collection) => {
    setCollections(collections.filter((c) => c.id !== collection.id));
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/collections"
            element={
              <ComponentWithNavBar collections={collections}>
                <Collections removeFromCollections={removeFromCollections} />
              </ComponentWithNavBar>
            }
          />
          <Route
            path="/"
            element={
              <div className="flex justify-center">
                <ComponentWithNavBar collections={collections}>
                  <Pokemons addToCollections={addToCollections} />
                </ComponentWithNavBar>
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

function ComponentWithNavBar(props) {
  const navigate = useNavigate();
  const toPokemons = () => {
    navigate("/", { state: { collections: props.collections } });
  };

  const toCollections = () => {
    navigate("/collections", { state: { collections: props.collections } });
  };
  return (
    <div className="w-full">
      <nav className="flex justify-between sticky top-0 z-20 bg-orange-600">
        <ul className="flex flow-row">
          <button
            className="mx-2 text-white font-bold underline"
            onClick={() => {
              toPokemons();
            }}
          >
            Pokemons
          </button>
          <button
            className="mx-2 text-white font-bold underline"
            onClick={() => {
              toCollections();
            }}
          >
            Collections
          </button>
        </ul>
      </nav>
      {props.children}
    </div>
  );
}

export default App;
