const {MongoClient} = require('mongodb');
const { model } = require('mongoose');
const { createPool } = require('mysql');
require('dotenv').config();
const {execSync} = require('child_process');
// const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;

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
            
            await collection.insertOne({
                _id: player.DiscordID,
                _Discord_ID: player.DiscordID,
                _name: player.name,
                _Elo: player.Elo,
                _Wins: player.Wins,
                _Losses: player.Losses,
            });
                //  _player: player});
            // await collection.insertOne({_id: player.DiscordID, player});

        } finally {
            mongoClient.close();
        }
    },
    CheckDataBaseForPlayer: async function (DiscordID) {
        // DiscordID = playerObject.DiscordID;
        let mongoClient;
        try {
            mongoClient = await module.exports.connectToCluster(DB_URI);
            const db = mongoClient.db("SquadElo");
            const collection = db.collection("PlayerInfo");

            console.log("checking for player in database of playerinfo with ID", DiscordID);
            
            found = await collection.find({_id: DiscordID}).toArray();
            return found;
        } catch(err) {
            console.error(err);
        } finally {
            mongoClient.close();
        }
    },
    GrabAllPlayerInformation: async function () {
        let mongoClient;
        try {
            mongoClient = await module.exports.connectToCluster(DB_URI);
            const db = mongoClient.db("SquadElo");
            const collection = db.collection("PlayerInfo");

            AllPlayers = await collection.find().toArray();
            return AllPlayers;
        } catch(err) {
            console.error(err);
            return err;
        } finally {
            mongoClient.close();
        }
    },
    UpdatePlayerInformation: async function (player) {
        let mongoClient;
        try {
            mongoClient = await module.exports.connectToCluster(DB_URI);
            const db = mongoClient.db("SquadElo");
            const collection = db.collection("PlayerInfo");

            console.log("updating player to database of playerinfo", player);

            ack = await collection.updateOne(
                {_id: player._Discord_ID},
                {$set: {
                    _Elo: player._Elo,
                    _Wins: player._Wins,
                    _Losses: player._Losses,
                }}
            );
            console.log(ack);
        } catch(err) {
            console.error(err);
        } finally {
            mongoClient.close();
        }
    },
};

// (async () => {
//     data = await module.exports.GrabAllPlayerInformation();
//     console.log(data);
// })();
