import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Movies() {
  const [movies, setMovies] = useState(null);
  const [visible, setVisible] = useState(8);

  const API_KEY = "cf4a1f832611fa30173f10337b20dba4";
  const BASE_IMG = "https://image.tmdb.org/t/p/w500";
  const mediaType = "movie";

  const pages = [...Array(10)].map((_, i) => i + 1);

  async function fetchMovies(page = 1) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
      );
      setMovies(data.results);
      setVisible(8);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  function showMore() {
    setVisible((prev) => prev + 4);
  }

  if (!movies) {
    return (
      <div className="center">
        <div className="circle"></div>
        <span>LOADING....</span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Movies</title>
      </Helmet>

      {/* Movies List */}
      <div className="row gy-3 gx-3 py-4">
        {movies.slice(0, visible).map((movie) => (
          <div key={movie.id} className="col-md-3">
            <Link
              to={`/moviedetails/${movie.id}/${mediaType}`}
              className="text-decoration-none text-white"
            >
              <div className="position-relative product">
                <img
                  src={BASE_IMG + movie.poster_path}
                  className="w-100"
                  alt={movie.title}
                />
                <h3 className="h5 text-center pt-2">
                  {movie.title.split(" ").slice(0, 3).join(" ")}
                </h3>

                <div className="vote position-absolute top-0 end-0 p-1">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </Link>
          </div>
        ))}

        {/* Show More Button */}
        {visible < movies.length && (
          <div className="d-flex justify-content-center align-items-center">
            <button
              onClick={showMore}
              className="btn btn-outline-warning fw-bolder w-50 mt-5"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      <nav
        aria-label="Page navigation"
        className="pb-5 pt-2 d-flex justify-content-center align-items-center"
      >
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className="page-item"
              onClick={() => fetchMovies(page)}
            >
              <button className="page-link fw-bolder text-dark">{page}</button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
