const {MongoClient} = require('mongodb');
const { model } = require('mongoose');
// const mongoose = require('mongoose');

// const url = ``


// MONGODB
// jdizzle : limer
// https://data.mongodb-api.com/app/data-spcyc/endpoint/data/v1
// APIKEY: BxhVohGJyfJRHgaE5TE1cIU6IWYKI5Ak1OwuGlvBBFOWCpXw3i7Iv3ZimQWv94oI

// const API_KEY = 'BxhVohGJyfJRHgaE5TE1cIU6IWYKI5Ak1OwuGlvBBFOWCpXw3i7Iv3ZimQWv94oI';
// const link = 'https://data.mongodb-api.com/app/data-spcyc/endpoint/data/v1';
DB_URI = 'mongodb+srv://jdizzle:limer@cluster0.ihvfowi.mongodb.net/?retryWrites=true&w=majority';

// DB_URI = 'mongodb+srv://jdizzle:limer@Cluster0.mongodb.net/';

// https://data.mongodb-api.com/app/data-spcyc/endpoint/data/v1/action/insertOne

module.exports = {
    connectToCluster: async function (uri) {
        let mongoClient;
        try {
            mongoClient = new MongoClient(uri);
            console.log('Connecting to MongoDb Atlas cluster ...');
            await mongoClient.connect();
            console.log('Success on connection');

            return mongoClient;
        } catch(err) {
            console.error('failed to connect to MongoDb Atlas', err);
            process.exit();
        }
    },

    InitializeDataBaseCollection: async function () {
        let mongoClient;
        try {
            mongoClient = await module.exports.connectToCluster(DB_URI);
            const db = mongoClient.db("SquadElo");
            const collection = db.collection('PlayerInfo');
        } finally {
            await mongoClient.close();
        }
    },

    AddPlayerToDataBaseCollection: async function (player) {
        let mongoClient;
        try {
            mongoClient = await module.exports.connectToCluster(DB_URI);
            const db = mongoClient.db("SquadElo");
            const collection = db.collection("PlayerInfo");

            console.log("adding player to database of playerinfo");
            
            await collection.insertOne({_id: player.DiscordID, _player: player});
            // await collection.insertOne({_id: player.DiscordID, player});

        } finally {
            mongoClient.close();
        }
    },
    CheckDataBaseForPlayer: async function (playerObject) {
        DiscordID = playerObject.DiscordID;
        let found = true;
        try {
            mongoClient = await module.exports.connectToCluster(DB_URI);
            const db = mongoClient.db("SquadElo");
            const collection = db.collection("PlayerInfo");

            console.log("checking for player in database of playerinfo");
            
            found = await collection.find({_id: DiscordID}).toArray();
            return found.length;
        } catch(err) {
            console.error(err);
        } finally {
            mongoClient.close();
        }
    }
}

// player = {
//     // DiscordID: "259202639743418378",
//     DiscordID: "25920263974341837",
//     name: "JDizzle98",
//     Elo: 0,
//     Wins: 0,
//     Losses: 0,
// };

// (async () => {
//     if (await module.exports.CheckDataBaseForPlayer(player)) {
//         console.log(await module.exports.CheckDataBaseForPlayer(player));
//         console.log("PLAYER FOUND");
//     } else {
//         console.log("NOT FOUND");
//     }
// })();
    


// module.exports.InitializeDataBaseCollection();

// DiscordUser, along the lines of 
// name: 
// discordId
// elo
// async function createPlayerElo(collection, DiscordUser) {
//     const playerInfo = {
//         name: ''
//     }
// }

// async function executeStudentCrudOperations() {
//     const uri = DB_URI;
//     let mongoClient;
 
//     try {
//         mongoClient = await connectToCluster(uri);
//     } finally {
//         await mongoClient.close();
//     }
// }

// executeStudentCrudOperations();
