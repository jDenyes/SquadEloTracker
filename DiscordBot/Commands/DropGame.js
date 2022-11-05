const {SlashCommandBuilder} = require('discord.js');
const appConsts = require('../App.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dropgame')
        .setDescription('Drops an existing game')
        .addStringOption(option =>
            option
                .setName('game-id')
                .setDescription('test')
                .setRequired(true)
        )
        ,
    async execute(interaction) {
        // const Game = {
        //     gameId: Math.floor(Math.random() * 10000), // number between 0 and 9999
        //     Teams: ['red', 'blue'], // change to an array of 2 teams
        //     Winner:'tbd',
        // }
        gameID = parseInt(interaction.options.get('game-id').value);
        interaction.client.Games.delete(gameID);
        await interaction.reply(`${gameID}: Game has been dropped`);
    },
};

// interaction.client to access the client object in this file