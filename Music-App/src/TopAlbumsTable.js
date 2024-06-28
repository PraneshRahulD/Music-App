import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTopAlbums,
  setCurrentPage,
  toggleBookmark,
} from './features/topAlbumsSlice';
import { ADD_FAVORITE, REMOVE_FAVORITE } from './utils/constants';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  Container,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const TopAlbumsTable = () => {
  const dispatch = useDispatch();
  const { albums, loading, error, currentPage, albumsPerPage, bookmarks } =
    useSelector((state) => state.topAlbums);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTopAlbums());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    dispatch(setCurrentPage(1)); 
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setCurrentPage(newPage + 1));
  };

  const handleToggleBookmark = (album) => {
    dispatch(toggleBookmark(album));
  };

  const isBookmarked = (album) => {
    return (
      bookmarks.findIndex(
        (b) => b.id.attributes['im:id'] === album.id.attributes['im:id']
      ) >= 0
    );
  };

  const filteredAlbums = albums.filter(
    (album) =>
      album['im:name'].label
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      album['im:artist'].label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastAlbum = currentPage * albumsPerPage;
  const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
  const currentAlbums = filteredAlbums.slice(
    indexOfFirstAlbum,
    indexOfLastAlbum
  );

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Top 100 Albums
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Album Art</TableCell>
              <TableCell>Album Name</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentAlbums.map((album, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={album['im:image'][2].label}
                    alt={album.title.label}
                    style={{ width: '50px' }}
                  />
                </TableCell>
                <TableCell>{album['im:name'].label}</TableCell>
                <TableCell>{album['im:artist'].label}</TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      isBookmarked(album) ? REMOVE_FAVORITE : ADD_FAVORITE
                    }
                  >
                    <IconButton onClick={() => handleToggleBookmark(album)}>
                      {isBookmarked(album) ? (
                        <Favorite color="error" />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredAlbums.length}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        rowsPerPage={albumsPerPage}
        rowsPerPageOptions={[10]}
        onRowsPerPageChange={() => {}}
      />
    </Container>
  );
};

export default TopAlbumsTable;
