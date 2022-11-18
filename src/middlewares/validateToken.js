import { sessionsCollection } from "../database/database.js";

export async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const session = await sessionsCollection.findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }

  req.userID = session.userID
  next()
}
