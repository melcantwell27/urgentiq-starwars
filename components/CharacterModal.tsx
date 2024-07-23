// /components/CharacterModal.tsx
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { clearSelectedCharacter, fetchCharacterHomeworld } from '../redux/slices/characterSlice';
import dayjs from 'dayjs';

const CharacterModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCharacter = useSelector((state: RootState) => state.characters.selectedCharacter);
  const character = useSelector((state: RootState) => state.characters.characters.find((char) => char.name === selectedCharacter));
  const homeworld = useSelector((state: RootState) => state.characters.homeworld);
  const homeworldStatus = useSelector((state: RootState) => state.characters.homeworldStatus);

  useEffect(() => {
    if (selectedCharacter) {
      if (character) {
        dispatch(fetchCharacterHomeworld(character.homeworld));
      }
    }
  }, [selectedCharacter, dispatch]);

  if (!character) return null;

  const handleClose = () => {
    dispatch(clearSelectedCharacter());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-4 right-4 text-xl font-bold"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{character.name}</h2>
        <p><strong>Height:</strong> {(parseInt(character.height) / 100).toFixed(2)} m</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Number of Films:</strong> {character.films.length}</p>
        <p><strong>Date Added:</strong> {dayjs(character.created).format('DD-MM-YYYY')}</p>

        {homeworldStatus === 'loading' && <p>Loading homeworld data...</p>}
        {homeworldStatus === 'succeeded' && homeworld && (
          <>
            <h3 className="text-xl font-semibold mt-4">Homeworld</h3>
            <p><strong>Name:</strong> {homeworld.name}</p>
            <p><strong>Terrain:</strong> {homeworld.terrain}</p>
            <p><strong>Climate:</strong> {homeworld.climate}</p>
            <p><strong>Residents:</strong> {homeworld.population} residents</p>
          </>
        )}
        {homeworldStatus === 'failed' && <p>Failed to load homeworld data.</p>}
      </div>
    </div>
  );
};

export default CharacterModal;
