import {MongoClient} from 'mongodb';
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.db.connect();
    console.log('mongoDB connected')
} catch (error) {
    console.log(error)
};

const db = mongoClient.db('wall.et');
export const inflowsCollection = db.collection('inflows');
export const userCollection = db.collection('users');
export const sessionsCollection = db.collection('sessions');
