import axios from "axios";
import React, { useEffect, useState } from "react";
import HomeItems from "../HomeItems/HomeItems";
import { Helmet } from "react-helmet";

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);

  const API_KEY = "cf4a1f832611fa30173f10337b20dba4";
  const BASE_URL = "https://api.themoviedb.org/3/trending";

  async function fetchTrending(mediaType, setter) {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/${mediaType}/week?api_key=${API_KEY}`
      );
      setter(data.results);
    } catch (error) {
      console.error("Failed to fetch trending:", error);
    }
  }

  useEffect(() => {
    fetchTrending("movie", setMovieList);
    fetchTrending("tv", setSeriesList);
    fetchTrending("person", setPeopleList);
  }, []);

  const isLoading = movieList.length === 0;

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      {!isLoading ? (
        <>
          {/* Movies Section */}
          <div className="row gy-3 gx-3 py-4 ">
            <div className="col-md-4 d-flex align-items-center ">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="h3">
                  Trending <br />
                  Movies <br />
                  To Watch Now
                </h2>
                <p className="text-danger">Most Watched Movies By Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>

            {movieList.slice(0, 15).map((item) => (
              <HomeItems key={item.id} item={item} />
            ))}
          </div>

          {/* Series Section */}
          <div className="row gy-3 gx-3 py-4 ">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="h3">
                  Trending <br />
                  Series <br />
                  To Watch Now
                </h2>
                <p className="text-danger">Most Watched Series This Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>

            {seriesList.slice(0, 15).map((item) => (
              <HomeItems key={item.id} item={item} />
            ))}
          </div>

          {/* People Section */}
          <div className="row gy-3 gx-3 pt-4 pb-5 ">
            <div className="col-md-4 d-flex align-items-center">
              <div>
                <div className="brdr w-25 mb-3"></div>
                <h2 className="h3">
                  Trending <br />
                  People <br />
                  To Watch Now
                </h2>
                <p className="text-danger">Top Trending People By Week</p>
                <div className="brdr w-100 mt-3"></div>
              </div>
            </div>

            {peopleList.slice(0, 15).map((item) => (
              <HomeItems key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : (
        <div className="center">
          <div className="circle"></div>
          <span>LOADING....</span>
        </div>
      )}
    </>
  );
}
