const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (admin, secret, expiresIn) => {
  const { username, email } = admin;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getCurrentAdmin: async (_, args, { Admin, currentAdmin }) => {
      if (!currentAdmin) {
        return null;
      } else {
        const admin = await Admin.findOne({
          username: currentAdmin.username,
        });
        return admin;
      }
    },
    getAdmin: async (_, { adminId }, { Admin }) => {
      try {
        const admin = await Admin.findOne({ _id: adminId });

        return admin;
      } catch (err) {
        throw new Error("User not found");
      }
    },
  },
  Mutation: {
    signinAdmin: async (_, { username, password }, { Admin }) => {
      const admin = await Admin.findOne({ username });
      if (!user) throw new Error("User not found");

      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) throw new Error("Invalid password");

      return { token: createToken(admin, process.env.SECRET, "48hr") };
    },
    signupAdmin: async (_, { username, name, email, password }, { Admin }) => {
      const findAdmin = await Admin.findOne({ username });
      if (findAdmin) throw new Error("User already exist");

      const findEmail = await User.findOne({ email });
      if (findEmail) throw new Error("Email already exist");

      const newAdmin = await new Admin({
        username,
        name,
        email,
        password,
      }).save();

      return { token: createToken(newAdmin, process.env.SECRET, "48hr") };
    },
  },
};
