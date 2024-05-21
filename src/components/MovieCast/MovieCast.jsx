import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { fetchMovies } from "../../api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  useEffect(() => {
    // const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

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
    //     setMovieCast(response.data.cast);
    //     if (response.data.cast.length === 0) setNoResult(true);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    if (!movieId) return;

    const url = `/movie/${movieId}/credits`;

    const getImages = async () => {
      try {
        setError(false);
        setMovieCast([]);
        setLoading(true);
        setNoResult(false);
        const response = await fetchMovies(url);
        setMovieCast(response.data.cast);
        if (response.data.cast.length === 0) setNoResult(true);
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
      {noResult === true && <p>No info about cast</p>}
      {movieCast.length !== 0 && (
        <ul className={css.list}>
          {movieCast.map((item) => (
            <li className={css.item} key={item.id}>
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                    : defaultImg
                }
                alt={item.name}
                width="100px"
                height="150px"
              />
              <h3 className={css.name}>{item.name}</h3>
              <p className={css.text}>{item.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
