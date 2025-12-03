import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function TvShow() {
  const [series, setSeries] = useState(null);
  const [visible, setVisible] = useState(8);
  const mediaType = "tv";

  const pages = Array.from({ length: 8 }, (_, i) => i + 1);

  async function getSeries(page) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=cf4a1f832611fa30173f10337b20dba4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
      );
      setSeries(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    getSeries(1);
  }, []);

  function showMore() {
    setVisible((prev) => prev + 4);
  }

  return (
    <>
      <Helmet>
        <title>TV</title>
      </Helmet>

      {series ? (
        <div className="row gy-3 gx-3 py-4">
          {series.slice(0, visible).map((item) => (
            <div key={item.id} className="col-md-3">
              <Link
                to={`/moviedetails/${item.id}/${mediaType}`}
                className="text-decoration-none text-white"
              >
                <div className="position-relative product">
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                    className="w-100"
                    alt={item.name}
                  />
                  <h3 className="h5 text-center pt-2">
                    {item.name.split(" ").slice(0, 3).join(" ")}
                  </h3>

                  <div className="vote position-absolute top-0 end-0 p-1">
                    {item.vote_average.toFixed(1)}
                  </div>
                </div>
              </Link>
            </div>
          ))}

          {visible < series.length && (
            <div className="d-flex justify-content-center align-items-center">
              <button
                onClick={showMore}
                className="btn btn-outline-warning text-white fw-bolder w-50 mt-5"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="center">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      )}

      {/* PAGINATION */}
      {pages.length > 0 && (
        <nav
          aria-label="Page navigation example"
          className="pb-5 pt-2 d-flex justify-content-center align-items-center"
        >
          <ul className="pagination">
            {pages.map((page) => (
              <li
                key={page}
                className="page-item"
                onClick={() => getSeries(page)}
              >
                <Link className="page-link fw-bolder text-dark">{page}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
