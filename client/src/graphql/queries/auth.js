import gql from "graphql-tag";

export const AUTHENTICATE = gql`
  mutation ($input: LoginDto!) {
    authenticate(input: $input) {
      id
    }
  }
`;

export const AUTHENTICATE_WITH_GOOGLE = gql`
  query ($input: TokenDTO!) {
    authenticateWithGoogle(input: $input)
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
