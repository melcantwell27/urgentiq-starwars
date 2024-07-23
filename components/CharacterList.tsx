// /components/CharacterList.tsx
'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAllCharacters } from '../redux/slices/characterSlice';
import CharacterCard from './CharacterCard';
import CharacterModal from '../components/CharacterModal';

const CharacterList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, status, error, selectedCharacter } = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    dispatch(fetchAllCharacters(1)); // Fetch the first page of characters
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>

      {/* Render the CharacterModal component if a character is selected */}
      {selectedCharacter && <CharacterModal />}
    </>
  );
};

export default CharacterList;
