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
        ),
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
        // ),
    async execute(interaction) {
        const teamSide = interaction.options.get('team-side').value;
        const gameID =   parseInt(interaction.options.get('game-id').value);

        // check for valid game
        if (!interaction.client.Games.has(gameID)) {
            interaction.reply(`ERROR: Game with ID(${gameID}) does not exist`);
            return;
        }

        game = interaction.client.Games.get(gameID);

        team = [interaction.options.get('top').value]
        // team = [interaction.options.get('top').value, interaction.options.get('jg').value, interaction.options.get('mid').value,
        //     interaction.options.get('adc').value, interaction.options.get('sup').value] ;
        
        // game.Teams[teamSide] = team;

        if (teamSide === 'Red') {
            console.log("adding to red team");
            game.Teams[appConsts.RED_TEAM] = team;
        } else {
            console.log("adding to blue team");
            game.Teams[appConsts.BLUE_TEAM] = team;
        }

        interaction.client.Games.set(gameID, game);
        let teamColour = teamSide;
        
        teamPlayers = interaction.client.users.cache.get(team[appConsts.TOP]);
        player = {
            DiscordID: team[appConsts.TOP],
            name: teamPlayers.username,
            Elo: 0,
            Wins: 0,
            Losses: 0,
        };

        (async () => {
            if (await database.CheckDataBaseForPlayer(player)) {
                // no nothing
                console.log("Player already in database");
            } else {
                // add the player to the database
                console.log("adding player to the database");
                database.AddPlayerToDataBaseCollection(player);
            }
        })();

        // let found;
        // if (database.CheckDataBaseForPlayer(player)) {
        //     found = "already in database";
        // } else {
        //     found = "must be added to database";
        // }
        console.log(teamPlayers);
        console.log(player.name);
        await interaction.reply(`Adding ${teamColour} Team to game ${gameID}: ${teamPlayers}`); // ${found}`); // + team[0]);
    },
    // interaction.client to access the client object in this file
};