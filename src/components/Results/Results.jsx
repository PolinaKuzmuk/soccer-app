import React from "react";

function Results({ soccerResults }) {
  const getBackgroundColor = (scoreTeam1, scoreTeam2) => {
    if (scoreTeam1 !== undefined) {
      if (scoreTeam1 > scoreTeam2) {
        return "green"; // Win
      } else if (scoreTeam1 < scoreTeam2) {
        return "red"; // Lose
      } else if (scoreTeam1 === scoreTeam2) {
        return "orange"; // Draw
      }
    }
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" colSpan="2">
            Team Names
          </th>
          <th scope="col">Result</th>
          <th scope="col">Match Date</th>
          <th scope="col">Half Time Score</th>
          <th scope="col">Stadium</th>
        </tr>
      </thead>
      <tbody>
        {soccerResults.map((event) => {
          const homeTeam = event.sport_event.competitors[0].name; // check for qualifier Home or Away
          const awayTeam = event.sport_event.competitors[1].name; // check for qualifier Home or Away
          const homeScore = event.sport_event_status.home_score;
          const awayScore = event.sport_event_status.away_score;
          const matchDate = new Date(
            event.sport_event.start_time
          ).toLocaleDateString("en-GB");
          const halfTimeScore = event.sport_event_status.period_scores?.[0]
            ? {
                firstHalf: `${event.sport_event_status.period_scores?.[0].home_score} - ${event.sport_event_status.period_scores?.[0].away_score}`,
                secondHalf: `${event.sport_event_status.period_scores?.[1].home_score} - ${event.sport_event_status.period_scores?.[1].away_score}`,
              }
            : null;
          const stadiumName = event.sport_event.venue.name;
          return (
            <tr>
              <td
                style={{
                  backgroundColor: getBackgroundColor(homeScore, awayScore),
                }}
              >
                {homeTeam}
              </td>
              <td
                style={{
                  backgroundColor: getBackgroundColor(awayScore, homeScore),
                }}
              >
                {awayTeam}
              </td>
              <td>
                {homeScore} - {awayScore}
              </td>
              <td>{matchDate}</td>
              <td>
                {halfTimeScore !== null ? (
                  <>
                    <p>First Half: {halfTimeScore.firstHalf}</p>
                    <p>Second Half: {halfTimeScore.secondHalf}</p>
                  </>
                ) : (
                  ""
                )}
              </td>
              <td>{stadiumName}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Results;
