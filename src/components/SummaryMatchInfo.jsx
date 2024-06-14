const SummaryMatchInfo = ({ matchInfo }) => {
  const competitionName =
    matchInfo.sport_event.sport_event_context.competition.name;
  const stadiumName = matchInfo.sport_event.venue?.name;
  const stadiumCity = matchInfo.sport_event.venue?.city_name;
  const stadiumCountry = matchInfo.sport_event.venue?.country_name;

  const sortedCompetitors = matchInfo.sport_event.competitors.reduce(
    (acc, currentTeam) => {
      if (currentTeam.qualifier === "home") {
        acc[0] = currentTeam;
      } else {
        acc[1] = currentTeam;
      }
      return acc;
    },
    []
  );

  return (
    <>
      <h1 className="title">Match Info</h1>
      <p className="fw-bolder">{competitionName}</p>
      <p>{stadiumName} Stadium</p>
      <p>
        {stadiumCity}, {stadiumCountry}
      </p>
      <div className="container text-center">
        <div className="row align-items-start">
          {sortedCompetitors.map((team) => {
            return (
              <div className="col" key={team.id}>
                <p className="text-uppercase fw-semibold">{team.qualifier}</p>
                <p>{team.name}</p>
                <p>{team.country}</p>
                <p>{team.abbreviation}</p>
              </div>
            );
          })}
        </div>
      </div>
      <p className="fw-semibold">Result</p>
      <p>
        {matchInfo.sport_event_status.home_score} -{" "}
        {matchInfo.sport_event_status.away_score}
      </p>
    </>
  );
};

export default SummaryMatchInfo;
