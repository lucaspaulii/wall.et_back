import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
console.log(process.env.MONGO_URI)
try {
    await mongoClient.connect();
    console.log('mongoDB connected')
} catch (error) {
    console.log(error)
};

const db = mongoClient.db('wall_et');
export const inflowsCollection = db.collection('inflows');
export const usersCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
