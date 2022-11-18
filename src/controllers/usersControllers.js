import { usersCollection } from "../database/database.js";

export async function postSignUp(req, res) {
  const user = req.user;
  console.log(user)
  try {
    await usersCollection.insertOne(user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function postSignIn(req, res) {}
