require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

//middleware
const app = express();
app.use(express.static("build")); //frontend

//cors
app.use(cors());

//connecting to db
const url = process.env.MONGOURL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("connected to MongoDB");
  })
  .catch((err) => console.log(err));

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("listening on port", `http://localhost:${PORT}/`);
});
