const API_KEY = "xnED3B492F2rdbco17yEj9CXYCOYBaCJa3B0kf9y";

const Api = {
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

  getMatchInfo: async (matchId) => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    try {
      const response = await fetch(
        `api/soccer/trial/v4/en/sport_events/sr%3Asport_event%3A${matchId}/timeline.json?api_key=${API_KEY}`,
        options
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.log("API err", err);
      throw new Error(err);
    }
  },
};

export default Api;
