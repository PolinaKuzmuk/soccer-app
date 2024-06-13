const utils = {
  defineHomeAwayTeam: (competitors, qualifier) => {
    return competitors.map((team) => {
      if (team.qualifier === qualifier) {
        return team.name;
      }
      return null;
    });
  },

  getBackgroundColor: (scoreTeam1, scoreTeam2) => {
    if (scoreTeam1 !== undefined) {
      if (scoreTeam1 > scoreTeam2) {
        return "green";
      } else if (scoreTeam1 < scoreTeam2) {
        return "red";
      } else if (scoreTeam1 === scoreTeam2) {
        return "orange";
      }
    }
  },

  extractMatchId: (string) => {
    const parts = string.split(":");
    return parts[parts.length - 1];
  },
};

export default utils;
