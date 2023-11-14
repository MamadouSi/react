// PokemonList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenerations, setSelectedGeneration, setPokemonList, setGamesList } from './actions';

const PokemonList = () => {
    const dispatch = useDispatch();
    const generations = useSelector((state) => state.generations);
    const selectedGeneration = useSelector((state) => state.selectedGeneration);
    const pokemonList = useSelector((state) => state.pokemonList);
    const gamesList = useSelector((state) => state.gamesList);

    useEffect(() => {
        const fetchGenerations = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/generation/');
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                const data = await response.json();
                dispatch(setGenerations(data.results));
            } catch (error) {
                console.error('Error fetching generations:', error);
            }
        };
        fetchGenerations();
    }, [dispatch]);

    useEffect(() => {
        const fetchPokemonAndGames = async () => {
            if (selectedGeneration) {
                try {
                    const responseGeneration = await fetch(`https://pokeapi.co/api/v2/generation/${selectedGeneration.toLowerCase()}/`);
                    if (!responseGeneration.ok) {
                        throw new Error('Network response was not ok.');
                    }

                    const dataGeneration = await responseGeneration.json();

                    const pokemonFetches = dataGeneration.pokemon_species.map(async pokemon => {
                        const pokemonResponse = await fetch(pokemon.url);
                        const pokemonData = await pokemonResponse.json();
                        return pokemonData.name;
                    });
                    const gamesFetches = dataGeneration.version_groups.map(async group => {
                        const groupResponse = await fetch(group.url);
                        const groupData = await groupResponse.json();
                        return groupData.name;
                    });

                    const fetchedPokemon = await Promise.all(pokemonFetches);
                    const fetchedGames = await Promise.all(gamesFetches);

                    dispatch(setPokemonList(fetchedPokemon));
                    dispatch(setGamesList(fetchedGames));
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchPokemonAndGames();
    }, [selectedGeneration, dispatch]);

    const handleGenerationChange = (event) => {
        dispatch(setSelectedGeneration(event.target.value));
    };

    return (
        <div>

                <h1>Pokemon List</h1>
                <label htmlFor="generationSelect">Select a Generation:</label>
                <select id="generationSelect" onChange={handleGenerationChange} value={selectedGeneration}>
                    <option value="">Select Generation</option>
                    {generations.map(generation => (
                        <option key={generation.name} value={generation.name}>
                            {generation.name}
                        </option>
                    ))}
                </select>
                {selectedGeneration && (
                    <div>
                        <h2>{selectedGeneration}</h2>
                        <h3>Pokémon:</h3>
                        <ul>
                            {pokemonList.map(pokemon => (
                                <li key={pokemon}>{pokemon}</li>
                            ))}
                        </ul>
                        <h3>Games:</h3>
                        <ul>
                            {gamesList.map(game => (
                                <li key={game}>{game}</li>
                            ))}
                        </ul>
                    </div>
                )}

        </div>
    );
};

export default PokemonList;
