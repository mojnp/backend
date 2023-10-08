const { MongoClient } = require("mongodb");
const AWS = require("aws-sdk");

// Set up AWS credentials for DigitalOcean Spaces
const spacesEndpoint = new AWS.Endpoint("https://fra1.digitaloceanspaces.com");
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.DO_ACCESS_KEY,
    secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
});

// MongoDB connection
const mongoClient = new MongoClient(process.env.MOJNP_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsCAFile: require("certifi").where(),
});

(async () => {
    try {
        // Connect to MongoDB
        await mongoClient.connect();
        const db = mongoClient.db("your_database_name"); // Replace 'your_database_name' with your actual MongoDB database name

        // Your MongoDB interactions can be done here using 'db'

        // For example, to get all users from MongoDB
        const users = await db.collection("users").find({}).toArray();

        // For example, to upload a file to DigitalOcean Spaces
        const params = {
            Bucket: "your_space_name", // Replace 'your_space_name' with your DigitalOcean Space name
            Key: "example.txt",
            Body: "Hello, World!",
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error(
                    "Error uploading file to DigitalOcean Spaces:",
                    err
                );
            } else {
            }
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close MongoDB connection when done
        await mongoClient.close();
    }
})();
