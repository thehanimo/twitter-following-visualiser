const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function insert(collection, doc) {
  try {
    const myDB = client.db("bigdata_webapp");
    const myColl = myDB.collection(collection);
    const result = await myColl.insertOne(doc);
    console.log(`A document was inserted into ${collection} with the _id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function del(collection, doc) {
    try {
      const myDB = client.db("bigdata_webapp");
      const myColl = myDB.collection(collection);
      const result = await myColl.deleteOne(doc);
      console.log(`A document was deleted from ${collection} with the _id: ${result.insertedId}`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

async function update(collection, filter, doc) {
    try {
      const myDB = client.db("bigdata_webapp");
      const myColl = myDB.collection(collection);
      const result = await myColl.updateOne(filter, doc);
      console.log(`A document was updated in ${collection} with the _id: ${result.insertedId}`);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }