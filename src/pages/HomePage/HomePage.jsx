import { useEffect, useState } from "react";
// import axios from "axios";

import { fetchMovies } from "../../api";

import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    // const url =
    //   "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    // const options = {
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmRkMjMwN2YwMDFmODczODk0OTAxZjA0NTk2ZTg2MiIsInN1YiI6IjY2NDlmNDliNWYxMDM3NDQxNGRmN2U0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5XVPpHzzyh-uE6LXyQAYagMOvzBkcIMkgFZ7krUYco",
    //   },
    // };
    // axios
    //   .get(url, options)
    //   .then((response) => {
    //     console.log(response);
    //     setTrendingMovies(response.data.results);
    //   })
    //   .catch((err) => console.error(err));
    const url = "trending/movie/day";

    const getImages = async () => {
      try {
        const response = await fetchMovies(url);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, []);

  return (
    <>{trendingMovies.length !== 0 && <MovieList movies={trendingMovies} />}</>
  );
}
