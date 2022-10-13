const NavButtons = (props) => {
  const {
    handleFirst,
    handleLast,
    handleNext,
    handlePrevious,
    startingIndex,
    pokemons,
  } = props;
  return (
    <nav className="flex justify-center fixed bottom-0 z-50 mb-10 mx-auto inset-x-0">
      <div className="inline-flex shadow-2xl shadow-black">
        <button
          onClick={handleFirst}
          disabled={startingIndex === 0}
          className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:bg-gray-400"
        >
          First
        </button>
        <button
          onClick={handlePrevious}
          disabled={startingIndex === 0}
          className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 disabled:bg-gray-400"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={startingIndex >= pokemons.length - (pokemons.length % 20)}
          className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 disabled:bg-gray-400"
        >
          Next
        </button>
        <button
          onClick={handleLast}
          disabled={startingIndex >= pokemons.length - (pokemons.length % 20)}
          className="bg-gray-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:bg-gray-400"
        >
          Last
        </button>
      </div>
    </nav>
  );
};

export default NavButtons;
