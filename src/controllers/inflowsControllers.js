import { ObjectId } from "mongodb";
import { inflowsCollection } from "../database/database.js";

export async function postInflow(req, res) {
  const inflowObject = req.inflowObject;

  try {
    await inflowsCollection.insertOne(inflowObject);
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function getInflow(req, res) {
  const userID = req.userID;

  try {
    const userInflows = await inflowsCollection
      .find({ userID: userID })
      .toArray();
    if (!userInflows) {
      return res.send([]);
    }
    return res.send(userInflows);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function deleteInflow(req, res) {
  const inflowID = req.params.inflowId;
  try {
    console.log(inflowID);
    const inflowExists = await inflowsCollection.findOne({
      _id: ObjectId(inflowID),
    });
    if (!inflowExists) {
      res, sendStatus(404);
    }
    await inflowsCollection.deleteOne({ _id: ObjectId(inflowID) });
    res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function updateInflow(req, res) {
  const inflowID = req.params.inflowID;
  const inflowObject = req.inflowObject;

  try {
    const inflowExists = await inflowsCollection.findOne({
      _id: ObjectId(inflowID),
    });
    if (!inflowExists) {
      res, sendStatus(404);
    }
    await inflowsCollection.updateOne(
      { _id: ObjectId(inflowID) },
      {
        $set: inflowObject,
      }
    );
    res.sendStatus(200);
  } catch (error) {}
}
