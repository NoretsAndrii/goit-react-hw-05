import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  console.log(Object.keys(movieDetails).length);
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
    <div>
      {Object.keys(movieDetails).length !== 0 && (
        <p>{movieDetails.release_date.slice(0, 4)}</p>
      )}
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt=""
        />
        <div>
          <h2>{`${movieDetails.title} (${movieDetails.release_date})`}</h2>
          <h3>Overview</h3>
          <p>{movieDetails.overview}</p>
          <h3>Genres</h3>
          <p></p>
        </div>
      </div>
    </div>
  );
}
