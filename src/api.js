import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchMovies = async (url, addParams = {}) => {
  const params = { language: "en-US", ...addParams };
  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmRkMjMwN2YwMDFmODczODk0OTAxZjA0NTk2ZTg2MiIsInN1YiI6IjY2NDlmNDliNWYxMDM3NDQxNGRmN2U0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5XVPpHzzyh-uE6LXyQAYagMOvzBkcIMkgFZ7krUYco",
    },
    params: params,
  };
  const response = await axios.get(url, options);
  console.log(response);
  return response;
};
