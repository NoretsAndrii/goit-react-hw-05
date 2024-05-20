import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { fetchMovies } from "../../api";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  const [movieCast, setMovieCast] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const { movieId } = useParams();

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
    const url = `/movie/${movieId}/credits`;

    const getImages = async () => {
      try {
        setNoResult(false);
        const response = await fetchMovies(url);
        setMovieCast(response.data.cast);
        if (response.data.cast.length === 0) setNoResult(true);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [movieId]);

  return (
    <>
      {noResult === true && <p>No info about cast</p>}
      {movieCast.length !== 0 && (
        <ul className={css.list}>
          {movieCast.map((item) => (
            <li className={css.item} key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
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
