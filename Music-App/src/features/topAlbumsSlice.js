import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CURRENT_PAGE,ALBUMS_PER_PAGE } from '../utils/constants';

export const fetchTopAlbums = createAsyncThunk(
  'topAlbums/fetchTopAlbums',
  async () => {
    const response = await axios.get(
      'https://itunes.apple.com/us/rss/topalbums/limit=100/json'
    );
    return response.data.feed.entry;
  }
);

const topAlbumsSlice = createSlice({
  name: 'topAlbums',
  initialState: {
    albums: [],
    loading: false,
    error: null,
    currentPage: CURRENT_PAGE,
    albumsPerPage: ALBUMS_PER_PAGE,
    bookmarks: [],
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setAlbumsPerPage(state, action) {
      state.albumsPerPage = action.payload;
    },
    toggleBookmark(state, action) {
      const album = action.payload;
      const existingIndex = state.bookmarks.findIndex(
        (b) => b.id.attributes['im:id'] === album.id.attributes['im:id']
      );
      if (existingIndex >= 0) {
        state.bookmarks.splice(existingIndex, 1);
      } else {
        state.bookmarks.push(album);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchTopAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setAlbumsPerPage, toggleBookmark } =
  topAlbumsSlice.actions;

export default topAlbumsSlice.reducer;
