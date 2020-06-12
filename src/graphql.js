const {
  ApolloServer,
  gql
} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Sura {
    title: String!
    ayaCount: Int!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    suras: [Sura!]!
    search(search: String!): [Sura!]!
  }
`;

const suras = [{
    title: 'الفاتحة',
    ayaCount: 7,
  },
  {
    title: 'البِقرة',
    ayaCount: 286,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    suras: () => suras,
    search: (_, {
      search
    }) => {

      if (!search) {
        return []
      }

      return suras.filter(x => x.title.indexOf(search) > -1)
    }
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// The `listen` method launches a web server.
server.listen().then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
})