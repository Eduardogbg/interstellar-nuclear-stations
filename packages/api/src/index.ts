import { Pool } from 'pg';
import { ApolloServer } from 'apollo-server';
import { makeSchemaAndPlugin } from 'postgraphile-apollo-server';
import { mergeSchemas } from 'graphql-tools';
import dataSources from './data-sources';
import arcsecondSchema from './schema';


const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const postGraphileOptions = {
  watchPg: true,
  graphiql: true,
  enhanceGraphiql: true,
  exportGqlSchemaPath: './src/generated/schema.graphql',
  appendPlugins: [
    require('@graphile-contrib/pg-simplify-inflector')
  ]
}

async function main() {
  const { schema: pgSchema, plugin } = await makeSchemaAndPlugin(
    pgPool,
    'public',
    postGraphileOptions
  );

  const schema = mergeSchemas({ 
    schemas: [pgSchema, arcsecondSchema]
  });
  
  const server = new ApolloServer({
    schema,
    dataSources,
    context: () => ({
      token: 'foo'
    }),
    plugins: [plugin]
  });

  const { url } = await server.listen();
  console.log(`🚀 Server ready at ${url}`);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
