// components/CharacterList.tsx
'use client'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchAllCharacters, setPage } from '../redux/slices/characterSlice';
import CharacterCard from './CharacterCard';
import CharacterModal from '../components/CharacterModal';
import Pagination from '@mui/material/Pagination';
import SearchBar from './SearchBar';

const CharacterList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { characters, status, error, selectedCharacter, page, pageCount, search } = useSelector((state: RootState) => state.characters);

  useEffect(() => {
    dispatch(fetchAllCharacters({ page, search }));
  }, [dispatch, page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <SearchBar />
      
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>

      {/* Render the CharacterModal component if a character is selected */}
      {selectedCharacter && <CharacterModal />}

      <div className="flex justify-center my-4">
        <Pagination count={pageCount} page={page} onChange={handlePageChange} color="primary" style={{ backgroundColor: 'gold' }}/>
      </div>
    </>
  );
};

export default CharacterList;
