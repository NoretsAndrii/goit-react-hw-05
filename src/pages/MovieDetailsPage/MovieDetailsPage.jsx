import { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import axios from "axios";

import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmRkMjMwN2YwMDFmODczODk0OTAxZjA0NTk2ZTg2MiIsInN1YiI6IjY2NDlmNDliNWYxMDM3NDQxNGRmN2U0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5XVPpHzzyh-uE6LXyQAYagMOvzBkcIMkgFZ7krUYco",
      },
    };
    axios
      .get(url, options)
      .then((response) => {
        console.log(response.data);
        setMovieDetails(response.data);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <>
      {Object.keys(movieDetails).length !== 0 && (
        <div>
          <div className={css.wrapper}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt=""
            />
            <div className={css.detail}>
              <h2>{`${movieDetails.title} (${movieDetails.release_date.slice(
                0,
                4
              )})`}</h2>
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movieDetails.genres.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
