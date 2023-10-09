const { MongoClient } = require('mongodb')

function connectToDb (dbName) {
  const uri = process.env.MOJNP_MONGO_URI
  const client = new MongoClient(uri)

  try {
    // Connect to the MongoDB server
    client.connect()

    // Get the database and collection
    const db = client.db(process.env.MOJNP_DB).collection(dbName)
    // console.log(db.find({}).toArray());

    return db
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error // Rethrow the error to be handled by the caller
  }
}

module.exports = {
  connectToDb
}
