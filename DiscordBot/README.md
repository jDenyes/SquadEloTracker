# SquadEloTracker

open Items {
    - Add GetElo Command
        - Return back a users Elo when requested
        - Return back a list of Peoples Elo
    - Add Real Elo Calculations
        - Grab Elo of each team from the databse to get an average team mmr
        - Mug has her formuals, incorporate them on setWinner
    - Integrate existing excel sheet 
        - loop through existing elo sheet and update the database with it
    - Better User Interface
        - Swap Player (for changing players on a team)
        - Remove Player
        - Remove Team
        - DropGame
    - Add Game history to the Database
        - each game with its teammembers, gameID, date
}