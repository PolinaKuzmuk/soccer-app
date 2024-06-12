import "./App.css";
import Results from "./components/Results/Results";
import Seasons from "./components/Seasons/Seasons.jsx";
import Api from "./services/Api.js";
import { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState([]);
  const [activeSeason, setActiveSeason] = useState("sr:season:83926");

  useEffect(() => {
    Api.getSoccerResults(activeSeason).then((res) => setResults(res.schedules));
  }, [activeSeason]);

  return (
    <div className="App container-fluid">
      <h1>Soccer Results</h1>
      <Results results={results}></Results>
      <Seasons
        activeSeason={activeSeason}
        setActiveSeason={setActiveSeason}
      ></Seasons>
    </div>
  );
}

export default App;
