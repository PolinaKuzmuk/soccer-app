import { useEffect, useState } from "react";
import Api from "../services/Api";
import Spinner from "./Spinner";
import SummaryMatchInfo from "./SummaryMatchInfo";
import DetailedMatchInfo from "./DetailedMatchInfo";
import ErrorPage from "./ErrorPage";

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
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      {loading ? (
        <Spinner />
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
