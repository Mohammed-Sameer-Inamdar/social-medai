// postsApi.js
import { gql, useQuery, useMutation, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', // Adjust the URI as needed
    cache: new InMemoryCache(),
});

// GraphQL Queries and Mutations
const GET_POSTS = gql`
    query GetPosts {
        posts {
            id
            title
            content
            userId
            reactions
        }
    }
`;

const GET_POSTS_BY_USER = gql`
    query GetPostsByUser($userId: ID!) {
        posts(userId: $userId) {
            id
            title
            content
            reactions
        }
    }
`;

const CREATE_POST = gql`
    mutation CreatePost($postData: PostInput!) {
        createPost(postData: $postData) {
            id
            title
            content
        }
    }
`;

const UPDATE_POST = gql`
    mutation UpdatePost($postData: PostInput!) {
        updatePost(postData: $postData) {
            id
            title
            content
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

const REACT_TO_POST = gql`
    mutation ReactToPost($postId: ID!, $reactions: ReactionInput!) {
        reactToPost(postId: $postId, reactions: $reactions) {
            id
            reactions
        }
    }
`;

const GET_POST_BY_ID = gql`
    query GetPostById($postId: ID!) {
        post(id: $postId) {
            id
            title
            content
            userId
            reactions
        }
    }
`;

export const useGetPostById = (postId) => {
    const { loading, error, data, refetch } = useQuery(GET_POST_BY_ID, {
        variables: { postId }, // Pass postId as a variable
        fetchPolicy: 'cache-and-network', // Ensures fresh data on mount
        skip: !postId, // Skip if postId is not provided
    });

    return {
        post: data?.post, // Directly access the single post
        isLoading: loading,
        refetch,
    };
};

// Custom Hooks
export const useGetPosts = () => {
    return useQuery(GET_POSTS);
};

export const useGetPostsByUser = (userId) => {
    return useQuery(GET_POSTS_BY_USER, {
        variables: { userId },
    });
};

export const useCreatePost = () => {
    return useMutation(CREATE_POST);
};

export const useUpdatePost = () => {
    return useMutation(UPDATE_POST);
};

export const useDeletePost = () => {
    return useMutation(DELETE_POST);
};

export const useReactToPost = () => {
    return useMutation(REACT_TO_POST);
};

// GraphQL Provider Component
export const GraphQLProvider = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);