import express from "express";
// import db from "../db.js";
import prisma from "../prismaClient.js";
import prisma from "../prismaClient.js";
const router = express.Router();

// get all todo's for logged-in user
router.get("/", async (req, res) => {
  const todos = await prisma.todo.findMany({
    where: { userId: req.userId },
  });
  res.json(todos);
});
// add a todo
router.post("/", async (req, res) => {
  const { task } = req.body;
  const todo = await prisma.todo.create({
    data:{
      task,
      userId: req.userId
    }
  })
  res.json(todo);
});
//upadte a todo
router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  const { page } = req.query;
  const updatedTodo = await prisma.todo.update({
    where:{
      id:parseInt(id),
      userId: req.userId
    },
    data:{
      completed:!!completed
    }
  })
  res.json(updatedTodo);
});
//delete a todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
const deleteTodo = await prisma.todo.delete({
  where:{
    id:parseInt(id),
    userId
  }
})
  
  res.send({ message: "todo deleted" },deleteTodo);
});
export default router;
