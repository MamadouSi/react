export const setGenerations = (generations) => ({
    type: 'SET_GENERATIONS',
    payload: generations,
});

export const setSelectedGeneration = (generation) => ({
    type: 'SET_SELECTED_GENERATION',
    payload: generation,
});

export const setPokemonList = (pokemonList) => ({
    type: 'SET_POKEMON_LIST',
    payload: pokemonList,
});

// actions.js
export const setGamesList = (gamesList) => ({
    type: 'SET_GAMES_LIST',
    payload: gamesList,
});
