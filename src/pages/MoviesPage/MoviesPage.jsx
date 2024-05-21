import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";
import { fetchMovies } from "../../api";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get("movieQuery") ?? "";
  const [searchMovies, setSearchMovies] = useState([]);
  const [notResult, setNotResult] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const notify = () => {
    setError(false);
    setNotResult(false);
    toast.error("Enter text to search!!!");
  };

  const handleSearch = (query) => {
    setSearchParams({ movieQuery: query });
  };

  useEffect(() => {
    if (movieQuery === "") return;
    // const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

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
    //     setSearchMovies(response.data.results);
    //   })
    //   .catch((err) => console.error(err));
    const url = "search/movie";

    const params = {
      include_adult: false,
      query: movieQuery,
    };

    const getImages = async () => {
      try {
        setNotResult(false);
        setError(false);
        setSearchMovies([]);
        setLoading(true);
        const response = await fetchMovies(url, params);
        if (response.data.results.length === 0) return setNotResult(true);
        setSearchMovies(response.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [movieQuery]);

  return (
    <div>
      <SearchForm onSearch={handleSearch} notify={notify} />
      {loading && <Loader />}
      {notResult && (
        <p>There is no movies with this request. Please, try again</p>
      )}
      {error && <ErrorMessage />}
      {movieQuery !== "" && (
        <MovieList movies={searchMovies} state={location} />
      )}
      <Toaster
        containerStyle={{
          top: 100,
        }}
      />
    </div>
  );
}
