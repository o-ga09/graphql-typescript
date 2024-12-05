import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    getUser(id: $userId) {
      userId
      username
      displayname
    }
  }
`;
