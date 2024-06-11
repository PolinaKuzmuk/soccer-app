Step 1: Display results table
Example API endpoint that could be used:
https://developer.sportradar.com/soccer/reference/soccer-season-schedule
Description:
·Table should be divided into 2 columns
·In the first column display Team Names
·In the second column display result

Step 2: Display more information in the results table
Description:
·Add new columns to your table with match date, half time score, and
stadium name
·Move team names into separate columns
·Make team name cell background different depending on result
oRed – if team lost
oGreen – if team won
oOrange – if match ended in a draw

Step 3: Add season filter to results table
Description:
·Add „Seasons” dropdown above results table
·Dropdown options can be fetched from the API endpoint, for example:
ohttps://developer.sportradar.com/soccer/reference/soccer-  
competition-seasons
·Or hardcoded, example:
osr:season:67233 - Ekstraklasa 19/20
osr:season:77453 - Ekstraklasa 20/21
osr:season: 84320 - Ekstraklasa 21/22
·Reload results table on dropdown change using endpoint from step 1

Step 4: Match info sub page
Description:
·When clicking on matches table row, user should be redirected to a
new match info sub page
·Use endpoint below to fetch match info, for example:
https://developer.sportradar.com/soccer/reference/soccer-sport-event-
timeline
o:sport_event_id – you will find ID in the endpoint from Step 1
·On a subpage display data about a match, teams, result, and data in
Timeline property
·Use your CSS skills to display match data in a nice way

Step 5: Add any new features by your choice
Description:
In this step you’re free to add whatever features you like, think about
refactoring, style improvements, use of another endpoints, etc
