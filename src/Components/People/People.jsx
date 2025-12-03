import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function People() {
  const [people, setPeople] = useState(null);
  const [visible, setVisible] = useState(8);

  const pages = Array.from({ length: 6 }, (_, index) => index + 1);
  const mediaType = "person";

  async function getPeople(page) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=cf4a1f832611fa30173f10337b20dba4&language=en-US&page=${page}`
      );
      setPeople(data.results);
    } catch (error) {
      console.log("Error : ", error);
    }
  }

  useEffect(() => {
    getPeople(1);
  }, []);

  const showMore = () => {
    setVisible((prev) => prev + 4);
  };

  return (
    <>
      <Helmet>
        <title>People</title>
      </Helmet>

      {people ? (
        <div className="row gy-3 gx-3 py-4">
          {people.slice(0, visible).map((person) => (
            <div key={person.id} className="col-md-3">
              <Link
                to={`/moviedetails/${person.id}/${mediaType}`}
                className="text-decoration-none text-white"
              >
                <div className="position-relative product">
                  {person.profile_path ? (
                    <>
                      <img
                        src={
                          "https://image.tmdb.org/t/p/w500" +
                          person.profile_path
                        }
                        className="w-100"
                        alt={person.name}
                      />
                      <h3 className="h5 text-center pt-2">{person.name}</h3>
                    </>
                  ) : (
                    <h3 className="h5 text-center">{person.name}</h3>
                  )}
                </div>
              </Link>
            </div>
          ))}

          {visible < people.length && (
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

      {pages && (
        <nav
          aria-label="Page navigation example"
          className="pb-5 pt-2 d-flex justify-content-center align-items-center"
        >
          <ul className="pagination">
            {pages.map((page) => (
              <li
                key={page}
                onClick={() => getPeople(page)}
                className="page-item"
              >
                <Link className="page-link fw-bolder text-dark" to="">
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
