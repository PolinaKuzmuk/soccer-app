import React, { useEffect, useState } from "react";
import Api from "../../services/Api";

function Seasons({ activeSeason, setActiveSeason }) {
  const [seasons, setSeasons] = useState([]);

  const handleClick = (id) => {
    console.log(id);
    setActiveSeason(id);
  };

  useEffect(() => {
    Api.getSeasons().then((res) => setSeasons(res.seasons));
  }, []);

  return (
    <div className="btn-group" key="season">
      <button
        className="btn btn-secondary btn-lg dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Competition Seasons
      </button>
      <ul className="dropdown-menu">
        {seasons.map((season) => {
          return (
            <li key={season.id}>
              <button
                className={`dropdown-item ${
                  activeSeason === season.id ? "active" : ""
                }`}
                type="button"
                aria-current={activeSeason === season.id ? "true" : "false"}
                onClick={() => handleClick(season.id)}
              >
                {season.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Seasons;
