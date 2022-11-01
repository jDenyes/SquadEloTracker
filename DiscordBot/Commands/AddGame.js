const {SlashCommandBuilder} = require('discord.js');
const appConsts = require('../App.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addgame')
        .setDescription('Creates a new game!'),
    async execute(interaction) {
        const Game = {
            gameId: Math.floor(Math.random() * 10000), // number between 0 and 9999
            Teams: ['red', 'blue'], // change to an array of 2 teams
            Winner:'tbd',
        }
        while (interaction.client.Games.has(Game.gameId)) {
            Game.gameId = Math.floor(Math.random() * 10000);
        }
        interaction.client.Games.set(Game.gameId, Game);
        await interaction.reply(`Game has been added with ID ${Game.gameId}`);
    },
};

// interaction.client to access the client object in this file