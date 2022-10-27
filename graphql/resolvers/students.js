module.exports = {
  Query: {
    getStudent: async (_, { studentId }, { Student }) => {
      try {
        const student = await Student.findOne({ _id: studentId });

        return student;
      } catch (err) {
        throw new Error("Student not found");
      }
    },
    getStudents: async (_, args, { Student }) => {
      const students = await Student.find();
      return students;
    },
  },
  Mutation: {
    signupStudent: async (_, { controlNumber }, { Student }) => {
      const findStudent = await Student.findOne({ controlNumber });
      if (findStudent) throw new Error("Student already exist");

      const newStudent = await new Student({
        controlNumber,
      }).save();

      return newStudent;
    },
  },
};
