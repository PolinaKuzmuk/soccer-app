import "./App.css";
import Results from "./components/Results/Results";
import getSoccerResults from "./services/Api.js";
import { useEffect, useState } from "react";

function App() {
  const [soccerResults, setSoccerResults] = useState([]);

  useEffect(() => {
    getSoccerResults().then((res) => setSoccerResults(res.schedules));
  }, []);

  return (
    <div className="App container-fluid">
      <h1>Soccer Results</h1>
      <Results soccerResults={soccerResults}></Results>
    </div>
  );
}

export default App;
