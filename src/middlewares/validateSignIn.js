import { sessionsCollection, usersCollection } from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function validateSignIn(req, res, next) {
  const user = req.body;
  try {
    const emailExists = await usersCollection.findOne({ email: user.email });
    if (!emailExists) {
      return res.status(401).send("Invalid e-mail");
    }
    if (bcrypt.compareSync(user.password, emailExists.password)) {
      let token = uuid();
      const sessionUser = {
        token,
        userID: emailExists._id,
      };
      req.sessionUser = sessionUser
      next()
      return;
    }
    return res.status(401).send("Invalid password");
  } catch (error) {
    res.sendStatus(400);
  }
}