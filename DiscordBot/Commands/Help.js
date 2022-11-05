const {SlashCommandBuilder} = require('discord.js');
const appConsts = require('../App.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Instructions on using the Elo Bot')
        .addSubcommand(subcommand =>
            subcommand
            .setName('general')
            .setDescription('general help')
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName('command')
            .setDescription('help with a specific command')
            .addStringOption(option => 
                option
                .setName('command-option')
                .setDescription('Command wanting help with')
                .setRequired(true)
                .setChoices({
                    name: "AddGame",
                    value: "AddGame",
                }, {
                    name: "AddTeam",
                    value: "AddTeam",
                }, {
                    name: "DropGame",
                     value: "DropGame",
                }, {
                    name: "StartGame",
                    value: "StartGame",
                }, {
                    name: "EndGame",
                    value: "EndGame",
                }, {
                    name: "Elo",
                    value: "Elo",
                })
            )
        )
        .addSubcommand(subcommand => 
            subcommand
            .setName("tutorial")
            .setDescription("bried tutorial on bot usage")
            .addStringOption(option => 
                option
                .setName('tutorial-option')
                .setDescription('temp')
                .setRequired(true)
                .setChoices({
                    name: "game-management",
                    value: "game-management",
                }, {
                    name: "elo",
                    value: "elo",
                })
            )
        ),
    async execute(interaction) {
        console.log(interaction.options._subcommand);
        if (interaction.options._subcommand === 'tutorial') {
            tutorial = interaction.options.get('tutorial-option').value;
            console.log(tutorial); 
            if (tutorial === 'game-management') {
                interaction.reply(`1.\tTo get a game started use the /addgame command
\t\t\tProvides a gameID. This gameID will be used for all further game commands.

2.\tAdd the teams with the /addteam command. Each command can only add one team at a time. Once for blue, once for red.

3.\tClose the game with the /setwinner command. This will update the database with each players new elo`)

            }
        } else if (interaction.options._subcommand === 'command') {
            await interaction.reply("FIXME: ADD COMMAND HELP INFO");

        } else if (interaction.options._subcommand === 'general') { // no subcommand
            
                    await interaction.reply(`
Hello, welcome to the Elo Bot help page

To learn more about a specific command use /help command option
Here are the commands available
    Creating and Managing Games
        - addgame
        - addteam
        - dropgame
        - startgame
        - endgame

    Leaderboards
        - elo (my or leaderboard)

For tutorials on using the bot use the /help tutorial option`);
        }
    },
};

// interaction.client to access the client object in this file