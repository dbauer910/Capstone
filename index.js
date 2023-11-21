require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const { PORT, MONGO } = process.env;
mongoose.connect(`${process.env.MONGO}/Capstone`);
const db = mongoose.connection;
db.once("open", () => console.log(`Connected to: ${MONGO}`));

//const homeFeed =  require("./Controllers/home-feed.controller");
const post = require("./Controllers/post.controller");
const profile = require("./Controllers/profile.controller");
//const search = require("./Controllers/search.controller"); //? STRETCH GOAL

app.use(express.json());
app.use(require("cors")());
//app.use("/home", homeFeed);
app.use("/post", post);
app.use("/profile", profile);
//app.use("/search", search); //? STRETCH GOAL

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));