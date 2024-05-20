import { useState, useEffect } from "react";
import axios from "axios";

import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [query, setQuery] = useState(() => {
    const saveQuery = localStorage.getItem("query");
    if (saveQuery === null) return "";
    return saveQuery;
  });
  const [searchMovies, setSearchMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.clear("query");
    const form = e.target;
    const query = form.elements.input.value;
    console.log(query);
    localStorage.setItem("query", query);
    setQuery(query);
    form.reset();
  };

  useEffect(() => {
    if (query === "") return;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

    const options = {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmRkMjMwN2YwMDFmODczODk0OTAxZjA0NTk2ZTg2MiIsInN1YiI6IjY2NDlmNDliNWYxMDM3NDQxNGRmN2U0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5XVPpHzzyh-uE6LXyQAYagMOvzBkcIMkgFZ7krUYco",
      },
    };

    axios
      .get(url, options)
      .then((response) => {
        console.log(response);
        setSearchMovies(response.data.results);
      })
      .catch((err) => console.error(err));
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="input" />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={searchMovies} />

      <p>MoviesPage</p>
    </div>
  );
}
