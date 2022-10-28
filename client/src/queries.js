import { gql } from "apollo-boost";

// Post Queries
export const GET_CURRENT_ADMIN = gql`
  query {
    getCurrentAdmin {
      _id
      username
      name
      email
      password
    }
  }
`;

export const GET_STUDENTS = gql`
  query {
    getStudents {
      controlNumber
    }
  }
`;

// user Mutations
export const SIGNIN_ADMIN = gql`
  mutation($username: String!, $password: String!) {
    signinAdmin(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_STUDENT = gql`
  mutation($controlNumber: String!) {
    signupStudent(controlNumber: $controlNumber) {
      controlNumber
    }
  }
`;
