const http = require("http");
const { ObjectId } = require("mongodb");
const Server = require("./controller");
const { getReqData } = require("./utils");
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, PATCH, POST, DELETE",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": 2592000, // 30 days
  };
  // retrieve TodoApp database
  const server = new Server();
  const TodoApp = await server.getDatabase("TodoApp");
  const todos = await TodoApp.getCollection("todos");

  // set the request route

  // OPTIONS method for preflight request to server sending POST, PATCH, DELETE request
  if (req.method === "OPTIONS") {
    try {
      res.writeHead(204, headers);
      res.end(JSON.stringify({}));
    } catch (error) {
      throw error;
    }
  } 
  // /api/todos : GET
  else if (req.url === "/api/todos" && req.method === "GET") {
    // get all todos
    try {
      const allTodos = await todos.getAllDocuments();
      // set the status code, and content-type
      res.writeHead(200, headers);
      // send the data
      res.end(JSON.stringify(allTodos));
    } catch (error) {
      // set the status code and content-type

      res.writeHead(404, headers);
      // send the error
      res.end(JSON.stringify({ message: error.toString() }));
    }
  }

  // api/todos/:id : GET
  else if (
    req.url.match(/\/api\/todos\/([A-Z]|[a-z]|[0-9])/) &&
    req.method === "GET"
  ) {
    // get todo by id
    try {
      // get id from url
      const id = req.url.split("/")[3];
      // get todo
      const todo = await todos.getDocumentById(ObjectId(id));
      res.writeHead(200, headers);
      res.end(JSON.stringify(todo));
    } catch (error) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: error.toString() }));
    }
  }

  // api/todos : POST
  else if (req.url === "/api/todos" && req.method === "POST") {
    // add new todo
    try {
      // get body of data
      const newTodo = await getReqData(req);
      // add new data to database
      await todos.postDocument(newTodo);
      res.writeHead(200, headers);
      res.end(JSON.stringify(newTodo));
    } catch (error) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: error.toString() }));
    }
  }

  // api/todos/:id PATCH
  else if (
    req.url.match(/\/api\/todos\/([A-Z]|[a-z]|[0-9])/) &&
    req.method === "PATCH"
  ) {
    //update todo by id
    try {
      // get id from url
      const id = req.url.split("/")[3];
      // get body of data
      const updatedData = await getReqData(req);
      // update data by _id
      const updatedTodo = await todos.updateDocument(
        { _id: ObjectId(id) },
        updatedData
      );
      res.writeHead(200, headers);
      res.end(JSON.stringify(updatedTodo));
    } catch (error) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: error.toString() }));
    }
  }

  // api/todos/:id DELETE
  else if (
    req.url.match(/\/api\/todos\/([A-Z]|[a-z]|[0-9])/) &&
    req.method === "DELETE"
  ) {
    //delete todo by id
    try {
      // get id from url
      const id = req.url.split("/")[3];
      // delete data by id
      const deletedDocument = await todos.deleteDocument(ObjectId(id));
      res.writeHead(200, headers);
      res.end(JSON.stringify(deletedDocument));
    } catch (error) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: error.toString() }));
    }
  }

  // api/todos : DELETE
  else if (req.url === "/api/todos" && req.method === "DELETE") {
    // delete all todos
    try {
      const allDeleted = await todos.deleteAllDocuments();
      res.writeHead(200,headers);
      res.end(JSON.stringify(allDeleted));
    } catch (error) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: error.toString() }));
    }
  }

  // api/todos?isCompleted=boolean GET
  else if (req.url.match(/\/api\/todos[?]/) && req.method === "GET") {
    // filter todo by isCompleted field
    try {
      // get query from url
      let rawSearchQuery = req.url.split("/")[2].split("?")[1].split("&");
      // split search query due to symbol =
      let searchQuery = rawSearchQuery.map((subQuery) => subQuery.split("="));
      // convert splited query to object
      let resQuery = Object.fromEntries(searchQuery);
      resQuery.isCompleted = resQuery.isCompleted === "true";
      // filter data by some fields
      const filteredDocument = await todos.filterDocuments(resQuery);
      res.writeHead(200, headers);
      res.end(JSON.stringify(filteredDocument));
    } catch (error) {
      res.writeHead(404, headers);
      res.end(JSON.stringify({ message: error.toString() }));
    }
  } else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
