// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  generations: [],
  selectedGeneration: '',
  pokemonList: [],
  gamesList: [], // Add a new field for storing games related to the selected generation
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_GENERATIONS':
      return { ...state, generations: action.payload };
    case 'SET_SELECTED_GENERATION':
      return { ...state, selectedGeneration: action.payload, pokemonList: [], gamesList: [] }; // Reset Pokemon and Games lists on changing generation
    case 'SET_POKEMON_LIST':
      return { ...state, pokemonList: action.payload };
    case 'SET_GAMES_LIST':
      return { ...state, gamesList: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
