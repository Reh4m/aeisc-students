import { gql } from "apollo-boost";

// Post Queries
export const GET_STUDENTS = gql`
  query {
    getStudents {
      controlNumber
    }
  }
`;

// user Mutations
export const SIGNUP_STUDENT = gql`
  mutation($controlNumber: String!) {
    signupStudent(controlNumber: $controlNumber) {
      controlNumber
    }
  }
`;
