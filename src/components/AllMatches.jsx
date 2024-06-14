import { useState } from "react";
import Results from "./Results";
import Seasons from "./Seasons";
import ErrorPage from "./ErrorPage";

const AllMatches = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [activeSeason, setActiveSeason] = useState("");

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Results
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        results={results}
        setResults={setResults}
        activeSeason={activeSeason}
      />
      <Seasons
        setError={setError}
        loading={loading}
        setLoading={setLoading}
        activeSeason={activeSeason}
        setActiveSeason={setActiveSeason}
      />
    </>
  );
};

export default AllMatches;
