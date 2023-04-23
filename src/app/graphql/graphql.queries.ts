import { gql } from 'apollo-angular';
import { environment } from 'src/environments/environment';

const HASHNODE_USERNAME = environment.hashnode_username;

const GET_ALL_POSTS = gql`
  query GetUserArticles($page: Int!){
    user(username: "${HASHNODE_USERNAME}") {
      publication {
        posts(page: $page) {
          title
          brief
          slug,
          coverImage,
          dateAdded,
        }
      }
    }
  }
`;

export { GET_ALL_POSTS };
