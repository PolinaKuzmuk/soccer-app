import React, { useEffect, useState } from "react";
import Api from "../services/Api";
import Spinner from "./Spinner";

const Seasons = ({
  setError,
  loading,
  setLoading,
  activeSeason,
  setActiveSeason,
}) => {
  const [seasons, setSeasons] = useState([]);

  const handleClick = (id) => {
    setActiveSeason(id);
  };

  useEffect(() => {
    Api.getSeasons()
      .then((res) => {
        setSeasons(res.seasons);
        setActiveSeason(res.seasons[0].id);
      })
      .catch((err) => {
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!seasons) {
    return <Spinner />;
  }

  return (
    <div className="btn-group">
      <button
        className="btn btn-secondary btn-lg dropdown-toggle"
        style={{ display: loading ? "none" : "" }}
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
                onClick={() => {
                  setLoading(true);
                  handleClick(season.id);
                }}
              >
                {season.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Seasons;
