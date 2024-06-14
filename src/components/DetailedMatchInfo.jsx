import utils from "../utils/utils";

const eventTypes = [
  "match_started",
  "match_ended",
  "yellow_card",
  "red_card",
  "yellow_red_card",
  "possible_goal",
];

const DetailedMatchInfo = ({ matchInfo }) => {
  const homeTeamName = utils.defineHomeAwayTeam(
    matchInfo.sport_event.competitors,
    "home"
  );
  const awayTeamName = utils.defineHomeAwayTeam(
    matchInfo.sport_event.competitors,
    "away"
  );

  const filteredTimeline = matchInfo.timeline.filter((item) =>
    eventTypes.includes(item.type)
  );

  return (
    <>
      <div className="accordion" id="accordionMatchInfo">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Detailed information
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionMatchInfo"
          >
            <div className="accordion-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">Time</th>
                      <th scope="col">Event</th>
                      <th scope="col">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTimeline.map((item) => {
                      const eventTime = item.time.split("T")[1].slice(0, 8);
                      const eventName = item.type.replace("_", " ");
                      const competitor = item.competitor;
                      const competitorName = () => {
                        if (competitor === "home") {
                          return homeTeamName;
                        } else if (competitor === "away") {
                          return awayTeamName;
                        }
                        return "";
                      };
                      return (
                        <tr key={item.id}>
                          <th scope="row">{eventTime}</th>
                          <td className="text-capitalize">{eventName}</td>
                          <td className="text-capitalize">
                            {competitorName()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedMatchInfo;
