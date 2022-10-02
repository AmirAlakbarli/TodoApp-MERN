const http = require("http");
const express = require("express");
const { ObjectId } = require("mongodb");
const Server = require("./controller");
const { getReqData } = require("./utils");
const PORT = process.env.PORT || 5000;

//! Initializing the App
const app = express();
app.use(express.json());

// const server = http.createServer(async (req, res) => {
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, PATCH, POST, DELETE",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": 2592000, // 30 days
};
// retrieve TodoApp database
const server = new Server();

let TodoApp, todos;
const getAllTodos = async () => {
  TodoApp = await server.getDatabase("TodoApp");
  todos = await TodoApp.getCollection("todos");
};

// options for preflight request
app.options("*", (req, res) => {
  console.log("options");
  res.header(headers);
  res.status(204).json({});
});
// /api/todos : GET
app.get("/api/todos", async (req, res, next) => {
  if (Object.keys(req.query).length > 0) {
    next();
    return;
  }
  try {
    await getAllTodos();
    const allTodos = await todos.getAllDocuments();
    if (!allTodos) {
      return res.status(404).json({
        message: "Problem was found retrieving all todos",
      });
    }
    res.header(headers);
    res.status(200).json(allTodos);
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

// /api/todos/:id : GET
app.get("/api/todos/:id", async (req, res) => {
  try {
    await getAllTodos();
    const id = req.params.id;
    const todo = await todos.getDocumentById(ObjectId(id));
    if (!todo) {
      return res.status(404).json({
        message: "No todo with this id was found",
      });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

// api/todos : POST
app.post("/api/todos", async (req, res) => {
  try {
    await getAllTodos();
    const newTodo = await req.body;
    const resTodo = await todos.postDocument(newTodo);
    if (!resTodo.acknowledged) {
      return res.status(404).json({
        message: "Couldn't add new todo",
      });
    }
    res.header(headers);
    res.status(200).json(newTodo);
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

// api/todos/:id PATCH
app.patch("/api/todos/:id", async (req, res) => {
  try {
    await getAllTodos();
    const id = req.params.id;
    const updatedFields = await req.body;
    const resTodo = await todos.updateDocument(
      { _id: ObjectId(id) },
      updatedFields
    );
    if (!resTodo.acknowledged) {
      return res.status(404).json({
        message: "Couldn't update todo",
      });
    }
    res.header(headers);
    res.status(200).json({ ...updatedFields, _id: ObjectId(id) });
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

// api/todos/:id : DELETE
app.delete("/api/todos/:id", async (req, res) => {
  console.log("delete");
  try {
    await getAllTodos();
    const id = req.params.id;
    const deletedTodo = await todos.deleteDocument(ObjectId(id));
    console.log(deletedTodo);
    if (!deletedTodo.deletedCount) {
      return res.status(404).json({
        message: "Todo with this id not found",
      });
    }
    res.header(headers);
    res.status(202).json({ _id: ObjectId(id) });
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

// api/todos : DELETE
app.delete("/api/todos", async (req, res) => {
  try {
    await getAllTodos();
    const allDeleted = await todos.deleteAllDocuments();
    if (!allDeleted.acknowledged) {
      return res.status(404).json({
        message: "Couldn't delete all todos",
      });
    }
    res.header(headers);
    res.status(200).json(allDeleted);
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

// api/todos?isCompleted=boolean GET
app.get("/api/todos", async (req, res) => {
  try {
    await getAllTodos();
    if (req?.query?.isCompleted)
      req.query.isCompleted = req.query.isCompleted === "true";
    const filteredTodos = await todos.filterDocuments(req.query);
    res.header(headers);
    res.status(200).json(filteredTodos);
  } catch (error) {
    res.status(404).json({
      message: error.toString(),
    });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
