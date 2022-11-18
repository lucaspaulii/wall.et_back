import { sessionsCollection, usersCollection } from "../database/database.js";

export async function postSignUp(req, res) {
  const user = req.user;

  try {
    await usersCollection.insertOne(user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function postSignIn(req, res) {
  const user = req.sessionUser;      
  try {
    const tokenExists = await sessionsCollection.findOne({
      userID: user.userID,
    });
    if (tokenExists) {
      res.send(tokenExists.token);
      return
    }
    await sessionsCollection.insertOne(user);
    res.send(user.token);
  } catch (error) {
    res.sendStatus(400);
  }
}
