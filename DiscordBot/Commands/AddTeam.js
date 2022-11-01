const {SlashCommandBuilder} = require('@discordjs/builders');
const appConsts = require('../App.js')
const database = require("../Database/database.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addteam')
        .setDescription('Adds a Team to the game!')
        // .addChannelOption(option => 
        //     option.setName('channel')
        //     .setDescription("chanel")
        // )
        .addStringOption(option =>
            option
                .setName('team-side')
                .setDescription('side your team is on')
                .setRequired(true)
                .setChoices({
                    name: "Red",
                    value: "Red", //appConsts.RED_TEAM,
                }, {
                    name: "Blue",
                    value: "Blue", //appConsts.BLUE_TEAM,
                })
        )
        .addStringOption(option =>
            option
                .setName('game-id')
                .setDescription('auto generated game id')
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName('top')
                .setDescription('top player')
                .setRequired(true)
        )
        // .addStringOption(option =>
        //     option
        //         .setName('jg')
        //         .setDescription('jg player')
        //         .setRequired(true)
        // )
        // .addStringOption(option =>
        //     option
        //         .setName('mid')
        //         .setDescription('mid player')
        //         .setRequired(true)
        // )
        // .addStringOption(option =>
        //     option
        //         .setName('adc')
        //         .setDescription('adc player')
        //         .setRequired(true)
        // )
        // .addStringOption(option =>
        //     option
        //         .setName('sup')
        //         .setDescription('sup player')
        //         .setRequired(true)
        // )
        ,
    async execute(interaction) {
        const teamSide = interaction.options.get('team-side').value;
        const gameID =   parseInt(interaction.options.get('game-id').value);

        // check for valid game
        if (!interaction.client.Games.has(gameID)) {
            interaction.reply(`ERROR: Game with ID(${gameID}) does not exist`);
            return;
        }
        
        // grabs the game instance
        game = interaction.client.Games.get(gameID);

        // holds the Discord IDs of each team
        let teamID = [interaction.options.get('top').value,
                // interaction.options.get('jg').value,
        ]
        let teamInfo = ['none']; //, 'none', 'none', 'none', 'none'];

        console.log(`Team Discord IDs ${teamID}`);
        // console.log(`Team Discord IDs ${team[0]}`);

        // Grabs player from database
        // if not in the databse add the player to the databse with fresh elo rating
        let Player;
        (async () => {
            Player = await database.CheckDataBaseForPlayer(teamID[0]);
            if (Player.length) {
                console.log(Player)
                Player = Player[0];
                console.log('Player found in database');
                console.log(Player)
            } else {
                console.log('Player NOT found in database');
                console.log(`Discord ID: ${teamID[0]} `);
                console.log('username: ', interaction.client.users.cache.get(teamID[0]));
                Player = {
                    DiscordID: teamID[0],
                    name: interaction.client.users.cache.get(teamID[0]).username,
                    Elo: 1000,
                    Wins: 0,
                    Losses: 0,
                };
                await database.AddPlayerToDataBaseCollection(Player);
                Player = await database.CheckDataBaseForPlayer(teamID[0]);
            }
            teamInfo[0] = Player;
            console.log(`Team Player Information ${teamInfo}`);
            // game.Teams[teamSide] = team;
    
            if (teamSide === 'Red') {
                console.log("adding to red team");
                game.Teams[appConsts.RED_TEAM] = teamInfo;
            } else {
                console.log("adding to blue team");
                game.Teams[appConsts.BLUE_TEAM] = teamInfo;
            }
    
            interaction.client.Games.set(gameID, game);
            let teamColour = teamSide;
            
            teamPlayers = [interaction.client.users.cache.get(teamID[0])];
            await interaction.reply(`Adding ${teamColour} Team to game ${gameID}: ${teamPlayers[0]}`); // ${found}`); // + team[0]);
        })();
    },
    // interaction.client to access the client object in this file
};