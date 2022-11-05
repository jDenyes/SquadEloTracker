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
        .addUserOption(option =>
            option
                .setName('jg')
                .setDescription('jg player')
                .setRequired(true)
        )
        // .addUserOption(option =>
        //     option
        //         .setName('mid')
        //         .setDescription('mid player')
        //         .setRequired(true)
        // )
        // .addUserOption(option =>
        //     option
        //         .setName('adc')
        //         .setDescription('adc player')
        //         .setRequired(true)
        // )
        // .addUserOption(option =>
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
        let teamID = [
            interaction.options.get('top').value,
            interaction.options.get('jg').value,
            // interaction.options.get('mid').value,
            // interaction.options.get('adc').value,
            // interaction.options.get('sup').value,
        ]
        

        console.log(`Team Discord IDs ${teamID}`);
        // console.log(`Team Discord IDs ${team[0]}`);

        // Grabs player from database
        // if not in the databse add the player to the databse with fresh elo rating
        (async () => {
            let teamInfo = ['none', 'none']; //, 'none', 'none', 'none'];
            let TeamPlayers = ['none', 'none'];
            for (let i = 0; i < 2; i++) {
                let Player;
                Player = await database.CheckDataBaseForPlayer(teamID[i]);
                if (Player.length) {
                    console.log(Player)
                    Player = Player[0];
                    console.log('Player found in database');
                    console.log(Player)
                } else {
                    console.log('Player NOT found in database');
                    console.log(`Discord ID: ${teamID[i]} `);
                    console.log('username: ', interaction.client.users.cache.get(teamID[i]));
                    Player = {
                        DiscordID: teamID[i],
                        name: interaction.client.users.cache.get(teamID[i]).username,
                        Elo: 1000,
                        Wins: 0,
                        Losses: 0,
                    };
                    await database.AddPlayerToDataBaseCollection(Player);
                    Player = await database.CheckDataBaseForPlayer(teamID[i]);
                }
                teamInfo[i] = Player;
                TeamPlayers[i] = interaction.client.users.cache.get(teamID[i]);
            }
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
                
            // TeamPlayers[i] = [interaction.client.users.cache.get(teamID[i])];
            await interaction.reply(`${gameID}: Adding ${teamColour} Team: ${TeamPlayers}`); // ${found}`); // + team[0]);
        })();

    },
    // interaction.client to access the client object in this file
};