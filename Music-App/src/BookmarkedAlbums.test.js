import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import BookmarkedAlbums from './BookmarkedAlbums';
import { toggleBookmark } from './features/topAlbumsSlice';

const mockStore = configureStore([]);

const initialState = {
  topAlbums: {
    bookmarks: []
  }
};

describe('BookmarkedAlbums', () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <BookmarkedAlbums />
      </Provider>
    );
    expect(screen.getByText(/Favorite Albums/i)).toBeInTheDocument();
  });

  test('displays "No Bookmarks yet" message when there are no bookmarks', () => {
    render(
      <Provider store={store}>
        <BookmarkedAlbums />
      </Provider>
    );
    expect(screen.getByText(/No Favorites yet/i)).toBeInTheDocument();
  });

  test('displays bookmarked albums', () => {
    store = mockStore({
      topAlbums: {
        bookmarks: [
          {
            'im:name': { label: 'Test Album' },
            'im:artist': { label: 'Test Artist' },
            'im:image': [{}, {}, { label: 'test-image.jpg' }],
            id: { attributes: { 'im:id': '1' } }
          }
        ]
      }
    });
    render(
      <Provider store={store}>
        <BookmarkedAlbums />
      </Provider>
    );
    expect(screen.getByText(/Test Album/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Artist/i)).toBeInTheDocument();
  });

  test('dispatches toggleBookmark when bookmark icon is clicked', () => {
    const album = {
      'im:name': { label: 'Test Album' },
      'im:artist': { label: 'Test Artist' },
      'im:image': [{}, {}, { label: 'test-image.jpg' }],
      id: { attributes: { 'im:id': '1' } }
    };

    store = mockStore({
      topAlbums: {
        bookmarks: [album]
      }
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <BookmarkedAlbums />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Remove Favorite/i }));

    expect(store.dispatch).toHaveBeenCalledWith(toggleBookmark(album));
  });
});
