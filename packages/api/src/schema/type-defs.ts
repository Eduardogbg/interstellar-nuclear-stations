import { gql } from 'apollo-server';
import { typeDef as Exoplanet } from './exoplanet';


const Query = gql`
  type Query {
    _empty: String
  }
`;

const typeDefs = [
  Query,
  Exoplanet
];


export default typeDefs;
