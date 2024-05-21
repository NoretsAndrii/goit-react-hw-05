import { useState, useEffect, Suspense } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";

// import axios from "axios";
import { fetchMovies } from "../../api";
import { BackLink } from "../../components/BackLink/BackLink";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    // const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    // const options = {
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmRkMjMwN2YwMDFmODczODk0OTAxZjA0NTk2ZTg2MiIsInN1YiI6IjY2NDlmNDliNWYxMDM3NDQxNGRmN2U0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5XVPpHzzyh-uE6LXyQAYagMOvzBkcIMkgFZ7krUYco",
    //   },
    // };
    // axios
    //   .get(url, options)
    //   .then((response) => {
    //     console.log(response.data);
    //     setMovieDetails(response.data);
    //   })
    //   .catch((err) => console.error(err));
    if (!movieId) return;

    const url = `movie/${movieId}`;

    const getImages = async () => {
      try {
        setError(false);
        setMovieDetails({});
        setLoading(true);
        const response = await fetchMovies(url);
        setMovieDetails(response.data);
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
      <BackLink to={backLinkHref}>Go back</BackLink>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {Object.keys(movieDetails).length !== 0 && (
        <div>
          <div className={css.wrapper}>
            <img
              className={css.image}
              src={
                movieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                  : defaultImg
              }
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
              <ul className={css.genres}>
                {movieDetails.genres.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <hr />
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast" state={backLinkHref}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to="reviews" state={backLinkHref}>
                  Reviews
                </Link>
              </li>
            </ul>
            <hr />
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </>
  );
}
