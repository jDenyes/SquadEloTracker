# SquadEloTracker

open Items {
    - Add GetElo Command
        <!-- - Return back a users Elo when requested (done) -->
        <!-- - Return back a leaderboard of Player Elo (done) -->
            - add win% and games played

    - Add Real Elo Calculations
        - Grab Elo of each team from the databse to get an average team mmr
        - Mug has her formuals, incorporate them on setWinner

    - Integrate existing excel sheet 
        - loop through existing elo sheet and update the database with it

    - Better User Interface
        - Swap Player (for changing players on a team)
        - Remove Player
        - Remove Team
        <!-- - DropGame (done) -->

    - Add Game history to the Database
        - each game with its teammembers, gameID, date

    - Don't let someone be on both teams, or two games at once

    - Admin Commands
        - only certain roles can access these commands
        - to edit the elo of any players
        - reset the elo
        
    - ONLY Certain roles get access to the addgame elo commands

    - handle error of case of not a real user

    - help command

    - add salty runbacks

    - resetElo

    - updateChannel, with updated MMR when a game has ended m 
}