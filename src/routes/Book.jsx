import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosRequest from "../services/useAxios";
import fallBackImg from "../assets/pngkey.com-placeholder-png-3500680.png";
import {
    Box,
    Card,
    CardActions,
    CardMedia,
    Button,
    Rating,
    Chip,
    Typography,
    Stack,
    Grid
} from "@mui/material";

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const { data, loading, get } = useAxiosRequest(
        `http://localhost:3000`
    );

    useEffect(() => {
        if (book.length === 0) {
            fetchBook();
        }
    }, [data]);

    const fetchBook = async () => {
        try {
            await get(`books/${id}`);
            setBook(data);
        } catch (error) {
            console.error("Failed to fetch the book:", error);
        }
    };


    if (loading) return <p>Loading...</p>;

    if (!book) return <p>No data available.</p>;

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <CardMedia
                        component="img"
                        sx={{ borderRadius: 2 }}
                        image={book.img || fallBackImg}
                        title={book.name}
                    />
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <Typography variant="h4" component="h1">
                            {book.name}
                        </Typography>
                        <Typography variant="subtitle1">
                            <strong>Author:</strong> {book.author}
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {book.genres?.map((genre, index) => (
                                <Chip
                                    key={index}
                                    label={genre}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                />
                            ))}
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="body1">
                                <strong>Rating:</strong>
                            </Typography>
                            <Rating
                                name="read-only"
                                value={Number(book.stars) || 0}
                                readOnly
                                size="small"
                            />
                        </Box>
                        <CardActions sx={{ mt: "auto", p: 0 }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{ alignSelf: "start" }}
                            >
                                Back
                            </Button>
                        </CardActions>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Book;