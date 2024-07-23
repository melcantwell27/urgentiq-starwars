// all the fetch requests are here!

// services/api.ts
import { Planet } from '../types';

export const fetchCharacters = async (page: number) => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await response.json();
  return data;
};

export const fetchPlanet = async (url: string): Promise<Planet> => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
