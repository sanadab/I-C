require("../src/models/User");
require("../src/models/Track");
require("../src/models/Details");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoutes = require("../src/routes/authRoutes");
const trackRoutes = require("../src/routes/trackRoutes");
const detailsRoutes = require("../src/routes/detailsRoutes");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);
app.use(detailsRoutes); // 👈 Register the route so job seekers can access counselor data

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
    app.listen(3008, () => {
        console.log("🚀 Server listening on port 3008");
    });
});

mongoose.connection.on("error", (err) => {
    console.error("❌ Error connecting to mongo:", err);
});