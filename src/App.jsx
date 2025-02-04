import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Root from './routes/Root';
import Books from './routes/Books';
import Book from './routes/Book';
import AddBook from './routes/AddBook';

const theme = createTheme({ // dark and light version?
  palette: {
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#ffab40',
    },
  },
});

function App() { // define paths and children of root
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Books /> },
        { path: '/book/:id', element: <Book /> },
        { path: '/addnew', element: <AddBook /> },
      ],
    },
  ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </LocalizationProvider>
  ); // all in MUI style with the variables theme and router
}

export default App;
