require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

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
  const sendMoneyHistoryCollection = client
    .db("PH-Web-Instructor-Trainee-Task")
    .collection("send-money-history");

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

    // Send Money Route
    app.post("/send-money/:id", async (req, res) => {
      try {
        const id = req.params.id; // Sender's user ID
        const { receiverMobile, amount, mobile, name, email } = req.body;

        // Define the transaction fee
        const transactionFee = amount > 100 ? 5 : 0; // Apply fee if amount is greater than 100

        // Step 1: Decrease sender's balance (amount + fee)
        const totalDeduction = amount + transactionFee; // Total amount deducted from sender
        const senderUpdate = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { balance: -totalDeduction } } // Deduct amount + fee
        );

        // Check if sender balance was updated
        if (senderUpdate.modifiedCount === 0) {
          return res
            .status(400)
            .send({ message: "Failed to deduct amount from sender." });
        }

        // Step 2: Increase receiver's balance
        const receiverUpdate = await userCollection.updateOne(
          { mobile: receiverMobile },
          { $inc: { balance: amount } } // Add amount to receiver
        );

        // Check if receiver was found and balance was updated
        if (receiverUpdate.modifiedCount === 0) {
          // If no receiver was found, revert sender's balance
          await userCollection.updateOne(
            { _id: new ObjectId(id) },
            { $inc: { balance: totalDeduction } } // Revert sender's balance
          );
          return res.status(404).send({ message: "Receiver not found." });
        }

        // Step 3: Add fee to admin account
        const adminId = "67bd82d3aa609c3a9e2db95a";
        await userCollection.updateOne(
          { _id: new ObjectId(adminId) },
          { $inc: { balance: transactionFee } }
        );

        // Step 4: Save the transaction in history
        const saveHistory = await sendMoneyHistoryCollection.insertOne({
          receiverMobile,
          amount,
          mobile,
          name,
          email,
          fee: transactionFee,
        });

        // Respond with the transaction history entry
        res.send(saveHistory);
      } catch (error) {
        console.error("Error sending money:", error);
        res.status(500).send({ message: "Internal server error." });
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
