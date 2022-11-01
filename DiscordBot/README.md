# SquadEloTracker

open Items {
    - Add adding multiple players to each time (requires signifigant refactor)
        - Cannot add multiple of the same team a game,
        - Stop adding of the same player twice in a game,
        - Adds them all to game.team object
        - Adds them all to the database
        - Updates Database for winning and losing team
    - Add GetElo Command
        - Return back a users Elo when requested
        - Return back a list of Peoples Elo
    - Add Real Elo Calculations
        - Mug has her formuals, incorporate them on setWinner
    - Integrate existing excel sheet 
        - loop through existing elo sheet and update the database with it

}