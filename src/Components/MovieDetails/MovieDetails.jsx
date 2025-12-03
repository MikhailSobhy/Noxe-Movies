import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const [details, setDetails] = useState({});
  const { id, mediaType } = useParams();

  const API_KEY = "cf4a1f832611fa30173f10337b20dba4";
  const BASE_IMG = "https://image.tmdb.org/t/p/w500";

  async function fetchDetails(itemId, type) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${itemId}?api_key=${API_KEY}&language=en-US`
      );
      setDetails(data);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  useEffect(() => {
    fetchDetails(id, mediaType);
  }, [id, mediaType]);

  const {
    poster_path,
    profile_path,
    title,
    name,
    overview,
    biography,
    vote_average,
    release_date,
    runtime,
    original_language,
  } = details;

  return (
    <>
      <Helmet>
        <title>Movies Details</title>
      </Helmet>

      <div className="row py-4">
        {/* Image */}
        <div className="col-md-3 py-4">
          <img
            src={BASE_IMG + (poster_path || profile_path)}
            className="w-100 product"
            alt={title || name}
          />
        </div>

        {/* Text Content */}
        <div className="col-md-7 py-4 d-flex align-items-center">
          <div>
            <h2>{title || name}</h2>

            <p className="text-white my-4">
              {overview || biography || "No description available."}
            </p>

            {vote_average && (
              <h6 className="h4">
                Views Rate :
                <span className="text-info mx-2">{vote_average}</span>
              </h6>
            )}

            {release_date && (
              <h6 className="h4">
                Release Date :
                <span className="text-info mx-2">{release_date}</span>
              </h6>
            )}

            {runtime && (
              <h6 className="h4">
                Runtime :
                <span className="text-info mx-2">{runtime} Minutes</span>
              </h6>
            )}

            {original_language && (
              <h6 className="h4">
                Original Language :
                <span className="text-info mx-2">
                  {original_language.toUpperCase()}
                </span>
              </h6>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
