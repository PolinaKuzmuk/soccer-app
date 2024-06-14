import { useEffect } from "react";
import Spinner from "./Spinner";
import utils from "../utils/utils";
import Api from "../services/Api";

const Results = ({
  setError,
  loading,
  setLoading,
  results,
  setResults,
  activeSeason,
}) => {
  useEffect(() => {
    if (activeSeason.length !== 0) {
      Api.getSoccerResults(activeSeason)
        .then((res) => {
          setResults(res.schedules);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSeason]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1>Soccer Results</h1>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Home Team</th>
                <th scope="col">Away Team</th>
                <th scope="col">Result</th>
                <th scope="col">Match Date</th>
                <th scope="col">Half Time Score</th>
                <th scope="col">Stadium</th>
              </tr>
            </thead>
            <tbody>
              {results.map((event) => {
                const homeTeamName = utils.defineHomeAwayTeam(
                  event.sport_event.competitors,
                  "home"
                );
                const awayTeamName = utils.defineHomeAwayTeam(
                  event.sport_event.competitors,
                  "away"
                );
                const homeScore = event.sport_event_status.home_score;
                const awayScore = event.sport_event_status.away_score;
                const matchId = utils.extractMatchId(event.sport_event.id);
                const matchDate = new Date(
                  event.sport_event.start_time
                ).toLocaleDateString("en-GB");
                const halfTimeScore = event.sport_event_status
                  .period_scores?.[0]
                  ? {
                      firstHalf: `${event.sport_event_status.period_scores?.[0].home_score} - ${event.sport_event_status.period_scores?.[0].away_score}`,
                      secondHalf: `${event.sport_event_status.period_scores?.[1].home_score} - ${event.sport_event_status.period_scores?.[1].away_score}`,
                    }
                  : null;
                const stadiumName = event.sport_event.venue?.name;
                return (
                  <tr
                    key={event.sport_event.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(`/match-info?id=${matchId}`, "_blank");
                    }}
                  >
                    <td
                      style={{
                        backgroundColor: utils.getBackgroundColor(
                          homeScore,
                          awayScore
                        ),
                      }}
                    >
                      {homeTeamName}
                    </td>
                    <td
                      style={{
                        backgroundColor: utils.getBackgroundColor(
                          awayScore,
                          homeScore
                        ),
                      }}
                    >
                      {awayTeamName}
                    </td>
                    <td>
                      {homeScore} - {awayScore}
                    </td>
                    <td>{matchDate}</td>
                    <td>
                      {halfTimeScore !== null ? (
                        <>
                          {halfTimeScore.firstHalf} | {halfTimeScore.secondHalf}
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
        </>
      )}
    </div>
  );
};

export default Results;
