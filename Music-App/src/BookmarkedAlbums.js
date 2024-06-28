import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleBookmark } from './features/topAlbumsSlice';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, IconButton, Tooltip, Card, CardContent
} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { FAVORITES_MESSAGE } from './utils/constants';

const BookmarkedAlbums = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.topAlbums.bookmarks);

  const handleToggleBookmark = (album) => {
    dispatch(toggleBookmark(album));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Favorite Albums
        </Typography>
        {bookmarks.length === 0 ? (
          <Typography variant="h6" component="p">
            {FAVORITES_MESSAGE}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Album Art</TableCell>
                  <TableCell>Album Name</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Favorite Bookmark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookmarks.map((album, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img src={album['im:image'][2].label} alt={album.title.label} style={{ width: '50px' }} />
                    </TableCell>
                    <TableCell>{album['im:name'].label}</TableCell>
                    <TableCell>{album['im:artist'].label}</TableCell>
                    <TableCell>
                      <Tooltip title="Remove Bookmark">
                        <IconButton onClick={() => handleToggleBookmark(album)}>
                          <Favorite color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default BookmarkedAlbums;
