async function getSoccerResults() {
  const options = { method: "GET", headers: { accept: "application/json" } };

  return await fetch(
    "/api/soccer/trial/v4/en/seasons/sr%3Aseason%3A93741/schedules.json?api_key=xnED3B492F2rdbco17yEj9CXYCOYBaCJa3B0kf9y",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export default getSoccerResults;
