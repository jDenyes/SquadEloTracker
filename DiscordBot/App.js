// Application ID: 1035743782357962753
// Public Key: 933132665aef48592b79c916d9ff4b31507e749221503b8846fbcb852b01d426
// Client Secret: RUPo5exhzC0SOIZBUJ1VwwvTMukaYyJB
// Client ID: 1035743782357962753

// https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8

// MONGODB
// jdizzle : limer
// https://data.mongodb-api.com/app/data-spcyc/endpoint/data/v1
// APIKEY: BxhVohGJyfJRHgaE5TE1cIU6IWYKI5Ak1OwuGlvBBFOWCpXw3i7Iv3ZimQWv94oI

require('dotenv').config();
const ClientSecret = "RUPo5exhzC0SOIZBUJ1VwwvTMukaYyJB";
const PublicKey = "933132665aef48592b79c916d9ff4b31507e749221503b8846fbcb852b01d426";
const CLIENT_ID = "1035743782357962753";
const EloBotToken = process.env.SquadEloTracker;
const GUILD_ID = "1036036794061434980";

const fs = require('node:fs');
const path = require('node:path');
const {REST} = require('@discordjs/rest');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    BLUE_TEAM: 0,
    RED_TEAM: 1,
    TOP: 0,
    JG: 1,
    MID: 2,
    ADC: 3,
    SUP: 4,
}

const rest = new REST({version: '10'}).setToken(EloBotToken);

const {Client, Routes, Events, GatewayIntentBits, Collection, messageLink } = require('discord.js');
const { mainModule } = require('node:process');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

// Map to hold all ongoing Games
client.Games = new Map();

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if(!command) {
            console.error(`No command matching ${interaction.commandName} was found`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch(err) {
            console.error(err);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
        console.log(client.Games);
    }
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
});

function start() {
    client.login(EloBotToken);
}

// Creates the Collection of commands to be used by the bot
async function AddCommands() {
    commands = [];
    client.commands = new Collection();
    // grab all the commands from our command file
    const commandsPath = path.join(__dirname, 'Commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


    // Grab the SlashCommandBuilder Json output of each commands data
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }

    // push the command to the discord API
    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application {/} commands.`);

            const data = await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
                { body: commands},
            );
        } catch (error) {
            console.log(error);
        }
    })();
}

AddCommands();
start();
