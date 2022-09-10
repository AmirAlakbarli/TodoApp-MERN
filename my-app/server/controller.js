// controller.js
// Logic behind the functionalities

// use dotenv to call variable in env file
const dotenv = require("dotenv");
dotenv.config();

// use mongodb for retrieving all data
const { MongoClient } = require("mongodb");
const url = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@server.ctltk7y.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url);

class Controller {
  // create private database and collection which is unchangable directly in this class
  #database;
  #collection;

  // get database by name
  async getDatabase(databaseName) {
    let server = await client.connect();
    this.#database = server.db(databaseName);
    return this;
  }

  // get collection by name
  async getCollection(collectionName) {
    let database = await this.#database;
    this.#collection = await database.collection(collectionName);
    return this;
  }

  // get all documents
  async getAllDocuments() {
    let collection = await this.#collection;
    let allDocuments = await collection.find().toArray();
    return allDocuments;
  }

  // get document by id
  async getDocumentById(id) {
    let collection = await this.#collection;
    let oneDocument = await collection.findOne({ _id: id });
    return oneDocument;
  }

  // create new document
  async postDocument(newDocument) {
    let collection = await this.#collection;
    let newCollection = await collection.insertOne(newDocument);
    return newCollection;
  }

  // update document by some fields
  async updateDocument(previousFields, nextFields) {
    let collection = await this.#collection;
    let updatedCollection = await collection.updateOne(previousFields, {
      $set: nextFields,
    });
    return updatedCollection;
  }

  // delete document by id
  async deleteDocument(id) {
    let collection = await this.#collection;
    let deleteDocument = await collection.deleteOne({ _id: id });
    return deleteDocument;
  }

  async deleteAllDocuments() {
    let collection = await this.#collection;
    let allDeleted = await collection.deleteMany({});
    return allDeleted;
  }

  // filter documents by filed inside object like parametrs
  async filterDocuments(filterFields) {
    let collection = await this.#collection;
    let filteredDocuments = await collection.find(filterFields).toArray();
    return filteredDocuments;
  }
}

module.exports = Controller;
