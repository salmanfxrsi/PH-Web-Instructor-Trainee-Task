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
  const transactionHistoryCollection = client
    .db("PH-Web-Instructor-Trainee-Task")
    .collection("transaction-history");
  const systemCollection = client
    .db("PH-Web-Instructor-Trainee-Task")
    .collection("system-data");
  const adminId = "67be933acc3e6f41e69bdd3f";
  const totalMoneyId = "67bddd0cf7f7921d6859a5b4";

  try {
    // Users-related API

    app.get("/users", async (req, res) => {
      try {
        const users = await userCollection.find().toArray();
        res.status(200).send(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

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

    app.patch("/update-user-status/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const status = req.query.status;

        if (!status) {
          return res.status(400).send({ message: "Status is required" });
        }

        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) }, 
          { $set: { status: status } }
        );

        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error });
      }
    });

    // Transaction History of a Specific User
    app.get("/transaction-history-specific-user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const transactionHistory = await transactionHistoryCollection
          .find({ userId: id })
          .sort({ timestamp: -1 })
          .limit(100)
          .toArray();

        res.send(transactionHistory);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // Transaction History of a Specific User
    app.get("/transaction-history-specific-agent/:mobile", async (req, res) => {
      try {
        const { mobile } = req.params;
        const transactionHistory = await transactionHistoryCollection
          .find({ agentMobile: mobile })
          .sort({ timestamp: -1 })
          .limit(100)
          .toArray();

        res.send(transactionHistory);
      } catch (error) {
        console.error("Error fetching transaction history:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // Endpoint to fetch total money in the system
    app.get("/system-balance", async (req, res) => {
      try {
        const systemBalance = await systemCollection.findOne({
          _id: new ObjectId(totalMoneyId),
        });

        if (!systemBalance) {
          return res.status(404).json({ message: "System balance not found" });
        }

        res.json(systemBalance);
      } catch (error) {
        console.error("Error fetching system balance:", error);
        res.status(500).json({ message: "Internal server error" });
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
        await userCollection.updateOne(
          { _id: new ObjectId(adminId) },
          { $inc: { balance: transactionFee } }
        );

        // Step 4: Save the transaction in history
        const saveHistory = await transactionHistoryCollection.insertOne({
          userId: id,
          receiverMobile,
          amount,
          transactionFee,
          timestamp: new Date(),
          type: "send-money",
        });

        // Respond with the transaction history entry
        res.send(saveHistory);
      } catch (error) {
        console.error("Error sending money:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    // CashOut Route
    app.post("/cash-out/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { amount, agentMobile, pin } = req.body;

        // Validate required fields
        if (!amount || !agentMobile || !pin) {
          return res
            .status(400)
            .json({ error: "Amount, agentMobile, and PIN are required." });
        }

        // Transaction Fees
        const agentFee = Math.floor(amount * 0.01); // 1% goes to agent
        const adminFee = Math.floor(amount * 0.005); // 0.5% goes to admin
        const totalDeduction = Math.floor(amount * 1.015); // 1.5% total deduction

        // Step 1: Check if the user has sufficient balance
        const user = await userCollection.findOne({ _id: new ObjectId(id) });
        if (!user) return res.status(404).json({ error: "User not found." });

        if (user.balance < totalDeduction) {
          return res.status(400).json({ error: "Insufficient balance." });
        }

        // Step 2: Verify PIN (Assuming user PIN is stored in DB)
        if (user.pin !== pin) {
          return res.status(401).json({ error: "Invalid PIN." });
        }

        // Step 3: Deduct total amount (including fee) from user balance
        await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { balance: -totalDeduction } }
        );

        // Step 4: Increase agent balance (amount + 1% commission)
        const agentUpdate = await userCollection.updateOne(
          { mobile: agentMobile, isAuthorized: true },
          { $inc: { balance: amount + agentFee } }
        );

        if (agentUpdate.matchedCount === 0) {
          return res
            .status(400)
            .json({ error: "Agent not authorized or not found." });
        }

        // Step 5: Add admin fee to admin account
        await userCollection.updateOne(
          { _id: new ObjectId(adminId) },
          { $inc: { balance: adminFee } }
        );

        // Step 6: Update total money in the system
        await systemCollection.updateOne(
          { _id: new ObjectId(totalMoneyId) },
          { $inc: { total_money: -totalDeduction + agentFee + adminFee } }
        );

        // Step 7: Save transaction history
        const result = await transactionHistoryCollection.insertOne({
          userId: id,
          agentMobile,
          amount,
          agentFee,
          adminFee,
          totalDeduction,
          timestamp: new Date(),
          type: "cash-out",
        });

        res.send(result);
      } catch (error) {
        console.error("Cash-out error:", error);
        res.status(500).json({ error: "Internal server error" });
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
