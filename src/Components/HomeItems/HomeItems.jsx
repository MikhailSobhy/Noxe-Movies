import React from "react";
import { Link } from "react-router-dom";

export default function HomeItems({ item }) {
  const imagePath = item.poster_path || item.profile_path;
  const displayName = (item.title || item.name)?.split(" ").slice(0, 3).join(" ");
  const showRating = item.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <div className="col-md-2">
      <Link
        to={`/moviedetails/${item.id}/${item.media_type}`}
        className="text-decoration-none text-white"
      >
        <div className="position-relative product">
          <img
            src={`https://image.tmdb.org/t/p/w500${imagePath}`}
            className="w-100"
            alt={displayName}
          />

          <h3 className="h5 text-center pt-2">{displayName}</h3>

          {showRating && (
            <div className="vote position-absolute top-0 end-0 p-1">
              {showRating}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
