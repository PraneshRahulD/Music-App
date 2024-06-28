
import reducer, { setCurrentPage, setAlbumsPerPage, toggleBookmark } from './topAlbumsSlice';

const initialState = {
  albums: [],
  loading: false,
  error: null,
  currentPage: 1,
  albumsPerPage: 10,
  bookmarks: []
};

describe('topAlbumsSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle setCurrentPage', () => {
    const previousState = { ...initialState, currentPage: 1 };
    expect(reducer(previousState, setCurrentPage(2))).toEqual({
      ...initialState,
      currentPage: 2
    });
  });

  it('should handle setAlbumsPerPage', () => {
    const previousState = { ...initialState, albumsPerPage: 10 };
    expect(reducer(previousState, setAlbumsPerPage(20))).toEqual({
      ...initialState,
      albumsPerPage: 20
    });
  });

  it('should handle toggleBookmark to add a bookmark', () => {
    const album = { id: { attributes: { 'im:id': '1' } }, 'im:name': { label: 'Test Album' } };
    const previousState = { ...initialState, bookmarks: [] };
    expect(reducer(previousState, toggleBookmark(album))).toEqual({
      ...initialState,
      bookmarks: [album]
    });
  });

  it('should handle toggleBookmark to remove a bookmark', () => {
    const album = { id: { attributes: { 'im:id': '1' } }, 'im:name': { label: 'Test Album' } };
    const previousState = { ...initialState, bookmarks: [album] };
    expect(reducer(previousState, toggleBookmark(album))).toEqual({
      ...initialState,
      bookmarks: []
    });
  });
});
