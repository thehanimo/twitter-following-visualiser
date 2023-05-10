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

async function getRandomFollowingList(limit){


}
async function getRandomAccountsWithTweets(n=20) {
  const coll = client.db("twitter_mock").collection("tweets")
  const tweets = await (coll.aggregate([{ $sample: { size: n } }])).toArray()
  const out = []
  await Promise.all(tweets.map(async t=>{
    const tweetTexts = await (coll.find({username: t.username}).project({text: 1, _id: 1})).toArray()
    out.push({
      username: t.username,
      tweets: tweetTexts.map(x=>({_id: x._id, text: x.text}))
    })
  }))
  return out;
}

async function getCurrentAccountData(username) {
  const coll = client.db("twitter_mock").collection("users")
  if ((await coll.findOne({username})) === null) {
    const data = await getRandomAccountsWithTweets()
    await coll.insertOne({
      username,
      data
    })
  }
  return await coll.findOne({username})
}

module.exports = {
  getCurrentAccountData
}



