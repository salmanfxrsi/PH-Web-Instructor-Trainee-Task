require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 9000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.upkox.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoDB client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to run the server and connect to MongoDB
async function run() {
  const userCollection = client
    .db("PH-Web-Instructor-Trainee-Task")
    .collection("users");

  try {
    // Users-related API

    app.post("/users", async (req, res) => {
      try {
        const userInfo = req.body;
        const result = await userCollection.insertOne(userInfo);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Failed to add user", error });
      }
    });

    app.get("/user-info", async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const user = await userCollection.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Failed to fetch user", error });
      }
    });

    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Start the server and connect to MongoDB
run().catch(console.dir);

// Root route
app.get("/", (req, res) => {
  res.send("PH PayGO's server is running...");
});

// Start the server
app.listen(port, () => {
  console.log(`PH PayGO's server is running on port ${port}`);
});
