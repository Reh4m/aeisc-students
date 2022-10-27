const adminsResolvers = require("./admins");
const studentsResolvers = require("./students");

module.exports = {
  Query: {
    ...adminsResolvers.Query,
    ...studentsResolvers.Query,
  },
  Mutation: {
    ...adminsResolvers.Mutation,
    ...studentsResolvers.Mutation,
  },
};
