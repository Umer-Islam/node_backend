import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import db from "../db.js";
import prisma from "../prismaClient.js";
const router = express.Router();
router.use(express.json());

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 9);
  //   console.log(hashedPassword);
  //   console.log(username, password);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const result = insertUser.run(username, hashedPassword);
    // add the first todo for the user
    const defaultTodo = `hello!, add your first todo`;
    await prisma.todo.create({
      data: { task: defaultTodo, userId: user.id },
    });
    const insertTodo = db.prepare(
      `INSERT INTO todos (user_id,task) VALUES (?,?)`
    );
    insertTodo.run(result.lastInsertRowid, defaultTodo);
    //create a token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prismama.user.findUnique({
      where: {
        username: username,
      },
    });
    //gaurd clause, if we cannot find a user, we return out.
    if (!user) {
      return res.status(404).send({ message: "username/email not found" });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    // if password is wrong we return out
    if (!passwordIsValid) {
      return res.status(401).send({ message: "wrong password..." });
    }
    console.log(user);
    //if user exits and password is correct, we have a successfull authentication
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json(token);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(503);
  }
});

export default router;
