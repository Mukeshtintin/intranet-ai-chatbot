require("dotenv").config();

const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");
const chatRoutes = require("./routes/chatRoutes");
const debugRoutes = require("./routes/debugRoutes");
const deleteRoutes = require("./routes/deleteRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/delete", deleteRoutes);
app.use("/debug", debugRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});