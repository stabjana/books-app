import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import {
  Box,
  Card,
  CardActions,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
  Rating,
  Chip,
  Typography,
  TextField
} from '@mui/material';
import fallBackImg from "../assets/pngkey.com-placeholder-png-3500680.png"

// list of books will be get and rendered

function Books() {

  const { data: books, alert, loading, get } = useAxios('http://localhost:3000'); //use the custom hook to get data from the server
  const [search, setSearch] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (books.length === 0) {
      getBooks();
    }
    else {
      setFilteredBooks(books);
    }
  }, [books]);

  const getBooks = async () => {
    await get('books');
  }
  // Update filtered books when search input or book list changes
  useEffect(() => {
    if (books) {
      const filtered = books.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.genres.some((genre) => genre.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredBooks(filtered);
    }
  }, [search, books]);

  const genres = [...new Set(books.flatMap((book) => book.genres))];//get a set of all genres used in 'db'

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // TODO: Implement search functionality
  return (
    <Box sx={{ mx: 'auto', p: 2 }}>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearch}
      />
      {loading && <CircularProgress />}
      {!loading && (
        <div>
          <Stack
            sx={{ justifyContent: 'space-around' }}
            spacing={{ xs: 1 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            {filteredBooks.map((book) => (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '15%',
                  minWidth: 200,
                }}
                key={book.name}
              >
                <CardMedia
                  sx={{ height: 250 }}
                  image={book.img ? book.img : fallBackImg}
                  title={book.name}
                />
                <Box sx={{ pt: 2, pl: 2 }}>
                  {book.genres.map((genre, i) => (
                    <Chip
                      key={i}
                      label={genre}
                      variant="outlined"
                      size="small"
                    />
                  ))}
                  <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                    {book.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {book.author}
                  </Typography>
                </Box>
                <CardActions
                  sx={{
                    justifyContent: 'space-between',
                    mt: 'auto',
                    pl: 2,
                  }}
                >
                  <Rating
                    name="read-only"
                    value={Number(book.stars)}
                    readOnly
                    size="small"
                  />
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            ))}
          </Stack>
        </div>
      )}
    </Box>
  );
}

export default Books;