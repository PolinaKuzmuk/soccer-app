import "./App.css";
import Results from "./components/Results/Results";
import Seasons from "./components/Seasons/Seasons.jsx";
import MatchInfo from "./components/MatchInfo/MatchInfo.jsx";
import Api from "./services/Api.js";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  // const [activeSeason, setActiveSeason] = useState("sr:season:83926"); // hard coded
  const [activeSeason, setActiveSeason] = useState("");

  useEffect(() => {
    if (activeSeason.length !== 0) {
      Api.getSoccerResults(activeSeason).then((res) => {
        setResults(res.schedules);
        setLoading(false);
      });
    }
  }, [activeSeason]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App container-fluid">
              <Results loading={loading} results={results} />

              <Seasons
                setLoading={setLoading}
                activeSeason={activeSeason}
                setActiveSeason={setActiveSeason}
              />
            </div>
          }
        />
        <Route
          path="match-info"
          element={
            <div className="App container-fluid">
              <MatchInfo />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
