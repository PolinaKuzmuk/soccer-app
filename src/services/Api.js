const API_KEY = "V4orMZT4JbPtocUXyJB48nteTrfQn0R2f6FmiGQg";
const BASE_URL = "/api/soccer/trial/v4/en";
const DEFAULT_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json" },
};

const fetchApi = async (url) => {
  try {
    const response = await fetch(url, DEFAULT_OPTIONS);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const Api = {
  getSoccerResults: (season) =>
    fetchApi(`${BASE_URL}/seasons/${season}/schedules.json?api_key=${API_KEY}`),

  getSeasons: () =>
    fetchApi(
      `${BASE_URL}/competitions/sr%3Acompetition%3A7/seasons.json?api_key=${API_KEY}`
    ),

  getMatchInfo: (matchId) =>
    fetchApi(
      `${BASE_URL}/sport_events/sr%3Asport_event%3A${matchId}/timeline.json?api_key=${API_KEY}`
    ),
};

export default Api;
