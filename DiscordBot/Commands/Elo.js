const {SlashCommandBuilder} = require('@discordjs/builders');
const database = require("../Database/database.js");
const pad = require('pad');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('elo')
        .setDescription('Get elo leaderboards from the squad up database')
        .addStringOption(option => 
            option 
                .setName('whose-elo')
                .setDescription('whose elo do you want')
                .setRequired(true)
                .setChoices({
                    name: "My",
                    value: "My",
                }, {
                    name: "Leaderboard",
                    value: "Leaderboard"
                })
        ),
        async execute(interaction) {
            WhoseElo = interaction.options.get('whose-elo').value;

            // grab sorted(by Elo) Player Info
            AllPlayers = await database.GrabAllPlayerInformation();
            console.log(AllPlayers);
            console.log(typeof AllPlayers);
            AllPlayers.sort((a, b) => {
                return  b._Elo - a._Elo;
            });

            let out;
            if (WhoseElo === "My") { // only grab information of user requesting
                console.log(interaction.user.id);
                console.log(interaction.user.username);
                
                const IdArray = AllPlayers.map(player => player._Discord_ID);
                let rank = IdArray.indexOf(interaction.user.id);
                out = `${rank + 1}.   ${interaction.user.username}\t ${AllPlayers[rank]._Elo}`;
                console.log(out);
                await interaction.reply(out);
            } else { // grab the whole leaderboard
                let rank = 1;
                header = pad(String(''), 3) + pad(String('NAME'), 30) + pad(String('ELO'), 6);
                gap = pad('', 39, '-');
                out = header + '\n' + gap;
                AllPlayers.forEach((e) => {
                    result = pad(String(`${rank}.`), 3);
                    result += pad(String(e._name), 30);
                    result += pad(String(e._Elo), 6);
                    out = out + '\n' + result;
                    if (rank % 5 === 0) {
                        out = out + '\n' + pad('', 39, '-');
                    }
                    rank ++;
                });
                console.log(out);
                await interaction.reply(`\`LeaderBoard\n${out}\``);
            }
        },
};
