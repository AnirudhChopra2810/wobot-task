const express = require('express');
const app = express();
const path = require('path');
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const bodyParser = require("body-parser");
app.use(bodyParser.json());


console.log(process.env.DATABASE)

const DB = process.env.DATABASE.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const staticPath = path.join(__dirname, "../Client");
app.use(express.static(staticPath));

app.use("/", userRouter);
app.use("/", productRouter);

app.listen(3000, () => {
    console.log("Server running on the port 3000")
})