import React from "react";

function Results({ soccerResults }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Team Names</th>
          <th scope="col">Result</th>
        </tr>
      </thead>
      <tbody>
        {soccerResults.map((event) => {
          const homeTeam = event.sport_event.competitors[0].name;
          const awayTeam = event.sport_event.competitors[1].name;
          const homeScore = event.sport_event_status.home_score;
          const awayScore = event.sport_event_status.away_score;
          return (
            <tr>
              <td>
                {homeTeam} - {awayTeam}
              </td>
              <td>
                {homeScore} - {awayScore}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Results;
