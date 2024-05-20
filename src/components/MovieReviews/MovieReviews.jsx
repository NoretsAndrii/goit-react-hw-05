import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { fetchMovies } from "../../api";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [noResult, setNoResult] = useState(false);
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
    const url = `movie/${movieId}/reviews`;

    const getImages = async () => {
      try {
        setNoResult(false);
        const response = await fetchMovies(url);
        setMovieReviews(response.data.results);
        if (response.data.results.length === 0) setNoResult(true);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [movieId]);

  return (
    <>
      {noResult === true && <p>No info about reviews</p>}
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
