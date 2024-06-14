import "./App.css";
import AllMatches from "./components/AllMatches.jsx";
import MatchInfo from "./components/MatchInfo.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App container-fluid">
              <AllMatches />
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
