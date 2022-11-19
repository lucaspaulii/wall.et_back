import { usersCollection } from "../database/database.js";
import bcrypt from "bcrypt";
import { signUpSchema } from "../modules/signUpSchema.js";

export async function schemaValidateSignUp(req, res, next) {
  let user = req.body;
  const { error } = signUpSchema.validate(user, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const emailExists = await usersCollection.findOne({ email: user.email });
    if (emailExists) {
      return res.status(409).send("e-mail already in use");
    }
  } catch (error) {
    res.sendStatus(400);
  }

  const encryptedPassword = bcrypt.hashSync(user.password, 10);

  user = { ...user, password: encryptedPassword };
  req.user = user;
  next();
}
