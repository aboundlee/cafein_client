import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';


 export default new ApolloClient({
    uri: "https://getcafein.herokuapp.com/graphql",
    clientState: {
        defaults: defaults,
        resolvers
    }
 });
