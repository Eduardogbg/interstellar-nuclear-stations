const { Pool } = require("pg");
const { ApolloServer } = require("apollo-server");
const { makeSchemaAndPlugin } = require("postgraphile-apollo-server");


const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const postGraphileOptions = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true
}

async function main() {
  const { schema, plugin } = await makeSchemaAndPlugin(
    pgPool,
    'public',
    postGraphileOptions
  );
  
  const server = new ApolloServer({
    schema,
    plugins: [plugin]
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
