import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
const app = express();
const PORT = process.env.PORT || 2121;
//middleware
app.use(express.json());

//get the file path
const __filename = fileURLToPath(import.meta.url);
//get the dir name from file path
const __dirname = dirname(__filename);
//for serving html file from ./public, also tells express to server all files from ./public as static. reqeests for the css files will be resolved from the public directory
app.use(express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html")); // also valid => path.join(__dirname, "public","index.html"))
});

//routes
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);
app.listen(PORT, () => {
  console.log(`server running on: http://localhost:${PORT}`);
});
