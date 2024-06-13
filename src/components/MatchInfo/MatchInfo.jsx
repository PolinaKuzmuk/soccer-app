import { useEffect, useState } from "react";
import Api from "../../services/Api";
import Spinner from "../Spinner/Spinner";
import SummaryMatchInfo from "../SummaryMatchInfo/SummaryMatchInfo";
import DetailedMatchInfo from "../DetailedMatchInfo/DetailedMatchInfo";

const MatchInfo = () => {
  const params = new URLSearchParams(document.location.search);
  const matchId = params.get("id");
  const [loading, setLoading] = useState(true);
  const [matchInfo, setMatchInfo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    Api.getMatchInfo(matchId)
      .then((res) => {
        setMatchInfo(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div>Page not found</div>
      ) : (
        <>
          <SummaryMatchInfo matchInfo={matchInfo} />
          <DetailedMatchInfo matchInfo={matchInfo} />
        </>
      )}
    </>
  );
};

export default MatchInfo;
