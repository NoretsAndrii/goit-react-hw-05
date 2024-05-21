import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { fetchMovies } from "../../api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    // const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;

    // const options = {
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmRkMjMwN2YwMDFmODczODk0OTAxZjA0NTk2ZTg2MiIsInN1YiI6IjY2NDlmNDliNWYxMDM3NDQxNGRmN2U0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5XVPpHzzyh-uE6LXyQAYagMOvzBkcIMkgFZ7krUYco",
    //   },
    // };
    // setNoResult(false);
    // axios
    //   .get(url, options)
    //   .then((response) => {
    //     console.log(response);
    //     setMovieReviews(response.data.results);
    //     if (response.data.results.length === 0) setNoResult(true);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    if (!movieId) return;

    const url = `movie/${movieId}/reviews`;

    const getImages = async () => {
      try {
        setError(false);
        setMovieReviews([]);
        setLoading(true);
        setNoResult(false);
        const response = await fetchMovies(url);
        setMovieReviews(response.data.results);
        if (response.data.results.length === 0) setNoResult(true);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {noResult === true && (
        <p>We do not have any reviews for this movie yet</p>
      )}
      {movieReviews.length !== 0 && (
        <ul>
          {movieReviews.map((item) => (
            <li key={item.id}>
              <h3>{item.author}</h3>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
