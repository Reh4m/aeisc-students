const { ApolloServer, gql, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

// import typedefs and resolvers
const filePath = path.join(__dirname, "graphql/typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./graphql/resolvers");

// import enviromefrom nt variables and mongoose models
require("dotenv").config({ path: "variables.env" });
const Admin = require("./models/Admin.js");
const Student = require("./models/Student.js");

// connect to mongo db atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error(err));

// verify jwt token passed from client
const getAdmin = async (token) => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again"
      );
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// Create Apollo/GraphQL Server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => ({
    name: error.name,
    message: error.message.replace("Context creation failed: ", ""),
  }),
  context: async ({ req }) => {
    const token = req.headers["authorization"];
    return { Admin, Student, currentAdmin: await getAdmin(token) };
  },
});

// the `listen` method launches a web server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
