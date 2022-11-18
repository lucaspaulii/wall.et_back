import joi from "joi";
import { usersCollection } from "../database/database.js";
import bcrypt from "bcrypt";

const signUpSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
});

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
