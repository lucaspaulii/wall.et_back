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
      return;
    }
    await sessionsCollection.insertOne(user);
    res.send(user.token);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function getUserInfo(req, res) {
  const userID = req.userID;

  try {
    const userInfo = await usersCollection.findOne({ _id: userID });
    if (!userInfo) {
      return res.sendStatus(404);
    }
    delete userInfo.password;
    return res.send(userInfo);
  } catch (error) {
    return res.sendStatus(401);
  }
}
