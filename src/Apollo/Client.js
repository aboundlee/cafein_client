import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';


 export default new ApolloClient({
    uri: "http://15.164.231.216:3001/graphql",
    clientState: {
        defaults: defaults,
        resolvers
    }
 });