import gql from "graphql-tag";

export const AUTHENTICATE = gql`
  query ($input: LoginDto!) {
    authenticate(input: $input)
  }
`;

export const AUTHENTICATE_WITH_GOOGLE = gql`
  query ($input: TokenDTO!) {
    authenticateWithGoogle(input: $input) {
      user {
        id
        email
        username
      }
      token
    }
  }
`;

export const CREATE_USER_WITH_GOOGLE = gql`
  mutation ($input: TokenDTO!) {
    signupWithGoogle(input: $input)
  }
`;

export const CREATE_USER = gql`
  mutation ($input: CreateUserDto!) {
    signup(input: $input)
  }
`;
