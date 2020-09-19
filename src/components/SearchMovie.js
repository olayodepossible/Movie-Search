import React, { useState } from "react";
import Movie from "./Movie";

const SearchMovie = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovies = async (e) => {
    e.preventDefault();

    const url = `https://api.themoviedb.org/3/search/movie?api_key=e08c4246d38fd42b73e6d5d187c7d767&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {" "}
      <form className="form" onSubmit={searchMovies}>
        <label htmlFor="query" className="label">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. 24 Hours"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <Movie data={movie} key={movie.id} />
        ))}
    </>
  );
};

export default SearchMovie;
