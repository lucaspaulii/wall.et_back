import { inflowsCollection } from "../database/database.js";

export async function postInflow(req, res) {
  const inflowObject = req.inflowObject;
  if (!inflowObject) {
    return res.sendStatus(401);
  }

  try {
    console.log(inflowObject);
    await inflowsCollection.insertOne(inflowObject);
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function getInflow(req, res) {
  const userID = req.userID;
  if (!userID) {
    return res.sendStatus(401);
  }

  try {
    const userInflows = await inflowsCollection.find({userID: userID}).toArray();
    console.log(userInflows)
    if (!userInflows) {
      return res.send([]);
    }
    return res.send(userInflows);
  } catch (error) {
    return res.sendStatus(401);
  }
}
