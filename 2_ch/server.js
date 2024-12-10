const express = require("express");
const app = express();
const PORT = process.env.PORT || 2121;

let data = ["jordon"];

// middleware
app.use(express.json());

// webpage endpoints
app.get("/", (request, response) => {
  response.json(data);
  console.log(request.method);
});

app.get("/sign-in", (req, res) => {
  //only the first one will be responded
  res.send(`<body style="background:black;color: white;font-family:verdana">
    <h1 style="background:cyan ;text-align:center">data:</h1>
    <p>${JSON.stringify(data)}</p>
    </body>`);
  //   res.sendStatus(500);
});
//api endpoints
app.get("/api/data", (req, res) => {
  console.time();

  console.log("api endpoint for sending data");
  console.log("method of the request: " + req.method);
  res.send(data);
  console.timeEnd();
});

app.post("/api/data", (req, res) => {
  const newEntry = req.body;// store whatever will be in the body of request here, we don't know what
  console.log(newEntry);
  data.push(newEntry.name);
  res.sendStatus(201);
});

app.delete("/api/data", (req, res) => {
  data.pop();
  console.log(`element removed from data list`);
  
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
