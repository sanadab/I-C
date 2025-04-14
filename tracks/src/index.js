require("../tracks/src/models/User");
require("../tracks/src/models/Track");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("../tracks/src/routes/authRoutes");
const trackRoutes = require("../tracks/src/routes/trackRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = "mongodb+srv://sanadab7:PasswordPassword@cluster0.qxmzvmg.mongodb.net/myDatabaseName?retryWrites=true&w=majority&appName=Cluster0";

if (!mongoUri) {
    throw new Error("MongoURI was not supplied.");
}

mongoose.set("strictQuery", true);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to mongo instance");

    // Start server only after successful MongoDB connection
    app.listen(3003, () => {
        console.log("🚀 Server listening on port 3003");
    });
});

mongoose.connection.on("error", (err) => {
    console.error("❌ Error connecting to mongo:", err);
});