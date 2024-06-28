import { configureStore } from '@reduxjs/toolkit';
import topAlbumsReducer from './features/topAlbumsSlice';

const store = configureStore({
  reducer: {
    topAlbums: topAlbumsReducer,
  },
});

export default store;
