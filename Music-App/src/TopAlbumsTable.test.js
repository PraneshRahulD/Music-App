import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import TopAlbumsTable from './TopAlbumsTable';
import { fetchTopAlbums } from './features/topAlbumsSlice';

jest.mock('./features/topAlbumsSlice', () => ({
  fetchTopAlbums: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  topAlbums: {
    albums: [],
    loading: false,
    error: null,
    currentPage: 1,
    albumsPerPage: 10,
    bookmarks: []
  }
};

describe('TopAlbumsTable Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    fetchTopAlbums.mockReturnValue({ type: 'topAlbums/fetchTopAlbums/fulfilled', payload: [] });
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <TopAlbumsTable />
      </Provider>
    );
    expect(screen.getByText(/Top 100 Albums/i)).toBeInTheDocument();
  });

  test('displays loading spinner when loading', () => {
    store = mockStore({
      topAlbums: {
        ...initialState.topAlbums,
        loading: true
      }
    });
    render(
      <Provider store={store}>
        <TopAlbumsTable />
      </Provider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('displays error message when there is an error', () => {
    const errorMessage = 'Failed to fetch albums';
    store = mockStore({
      topAlbums: {
        ...initialState.topAlbums,
        error: errorMessage
      }
    });
    render(
      <Provider store={store}>
        <TopAlbumsTable />
      </Provider>
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('dispatches fetchTopAlbums action on mount', async () => {
    render(
      <Provider store={store}>
        <TopAlbumsTable />
      </Provider>
    );
    await waitFor(() => {
      expect(fetchTopAlbums).toHaveBeenCalledTimes(1);
    });
  });

});
