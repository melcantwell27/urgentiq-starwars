// /redux/slices/characterSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters, fetchPlanet } from '../../services/api';
import { Character, Planet } from '../../types';


export const fetchAllCharacters = createAsyncThunk(
  'characters/fetchAll',
  async (page: number) => {
    // Fetch character data from the API for the given page
    const response = await fetchCharacters(page);
    return { results: response.results, count: response.count };
  }
);

export const fetchCharacterHomeworld = createAsyncThunk(
  'characters/fetchHomeworld',
  async (homeworldUrl: string) => {
    // Fetch planet data from the API for the given homeworld URL
    const response = await fetchPlanet(homeworldUrl);
    return response;
  }
);

const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [] as Character[],
    status: 'idle',
    error: null as string | null,
    selectedCharacter: null as string | null,
    homeworld: null as Planet | null,
    homeworldStatus: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    count: 0,
    page: 1,
    pageCount: 1,
  },
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<string>) => {
      state.selectedCharacter = action.payload;
      state.homeworld = null; // Reset homeworld data
      state.homeworldStatus = 'loading'; // Set loading status
    },
    clearSelectedCharacter: (state) => {
      state.selectedCharacter = null;
      state.homeworld = null;
      state.homeworldStatus = 'idle';
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.characters = action.payload.results;
        state.count = action.payload.count;
        state.pageCount = Math.ceil(action.payload.count / 10);
      })
      .addCase(fetchAllCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchCharacterHomeworld.pending, (state) => {
        state.homeworldStatus = 'loading';
      })
      .addCase(fetchCharacterHomeworld.fulfilled, (state, action) => {
        state.homeworldStatus = 'succeeded';
        state.homeworld = action.payload;
      })
      .addCase(fetchCharacterHomeworld.rejected, (state, action) => {
        state.homeworldStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch homeworld';
      });
  },
});

export const { setSelectedCharacter, clearSelectedCharacter, setPage } = characterSlice.actions;
export default characterSlice.reducer;
