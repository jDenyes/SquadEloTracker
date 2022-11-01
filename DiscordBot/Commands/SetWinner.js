const {SlashCommandBuilder} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const database = require("../Database/database.js");
const appConsts = require('../App.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-winner')
        .setDescription('sets the winner of the game to calculate elo gains')
        .addStringOption(option => 
            option
                .setName('winning-team')
                .setDescription('team that won the game')
                .setRequired(true)
                .setChoices({
                    name: "Red",
                    value: "Red",

                }, {
                    name: "Blue",
                    value: "Blue",
                })
        )
        .addStringOption(option =>
            option
                .setName('game-id')
                .setDescription('auto generated game id')
                .setRequired(true)
        ),
    async execute(interaction) {
        // check for valid game
        gameID = parseInt(interaction.options.get('game-id').value)
        if (!interaction.client.Games.has(gameID)) {
            interaction.reply(`ERROR: Game with ID(${gameID}) does not exist`);
            return;
        }

        winner = interaction.options.get('winning-team').value;
        let team;
        let winningID;
        if (winner === "Red") {
            winningID = appConsts.RED_TEAM;
        } else {
            winningID = appConsts.BLUE_TEAM;
        }



        team = interaction.client.Games.get(gameID).Teams[winningID];
        
        teamMembers = [
            interaction.client.users.cache.get(team[0]),
            // interaction.client.users.cache.get(team[1]),
            // interaction.client.users.cache.get(team[2]),
            // interaction.client.users.cache.get(team[3]),
            // interaction.client.users.cache.get(team[4]),
        ]
        await interaction.reply(`${winner} is the winner with members ${teamMembers}`);

        player = {
            DiscordID: team[0],
            name: teamMembers[0].username,
            Elo: 0,
            Wins: 0,
            Losses: 0,
        };

        // for teams in 
        // database.AddPlayerToDataBaseCollection(player);

        // grab elo of everyone in the game
    },
    // async IsInDataBase(player) {

    // } 
};

// interaction.client to access the client object in this file