const utils = {
  defineHomeAwayTeam: (competitors, qualifier) => {
    const filteredTeam = competitors.filter(
      (team) => team.qualifier === qualifier
    );
    return filteredTeam[0].name;
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
    return "inherit";
  },

  extractMatchId: (string) => {
    const parts = string.split(":");
    return parts[parts.length - 1];
  },

  refreshPage: () => {
    window.location.reload();
  },
};

export default utils;
