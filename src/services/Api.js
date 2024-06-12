const API_KEY = "xnED3B492F2rdbco17yEj9CXYCOYBaCJa3B0kf9y";

export default {
  getSoccerResults: async (season) => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    return await fetch(
      `/api/soccer/trial/v4/en/seasons/${season}/schedules.json?api_key=${API_KEY}`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  },

  getSeasons: async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    return await fetch(
      `/api/soccer/trial/v4/en/competitions/sr%3Acompetition%3A7/seasons.json?api_key=${API_KEY}`,
      options
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));
  },
};
