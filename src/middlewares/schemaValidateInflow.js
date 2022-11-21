import { usersCollection } from "../database/database.js";
import dayjs from "dayjs";
import { inflowSchema } from "../modules/inflowSchema.js";

export async function schemaValidateInflow(req, res, next) {
  const inflow = req.body;
  const userID = req.userID;

  const { error } = inflowSchema.validate(inflow, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  try {
    const user = await usersCollection.findOne({ _id: userID });
    const inflowObject = {
      userID: user._id,
      date: dayjs().format("DD/MM"),
      value: inflow.value,
      description: inflow.description,
      type: inflow.type,
    };
    req.inflowObject = inflowObject;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
  return;
}
