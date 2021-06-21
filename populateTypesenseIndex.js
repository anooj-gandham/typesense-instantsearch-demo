const Typesense = require('typesense');

module.exports = (async () => {
  const client = new Typesense.Client({
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
    apiKey: 'xyz',
  });

  const schema = {
    name: 'blogs',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'category', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'description', type: 'string' },
    ],
  };

  console.log('Populating index in Typesense');

  try {
    await client.collections('blogs').delete();
    console.log('Deleting existing collection: blogs');
  } catch (error) {
    // Do nothing
  }

  console.log('Creating schema: ');
  console.log(JSON.stringify(schema, null, 2));
  await client.collections().create(schema);

  console.log('Adding records: ');
  const blogs = require('./tt.json');
  try {
    const returnData = await client
      .collections('blogs')
      .documents()
      .import(blogs);
    console.log(returnData);
    console.log('Done indexing.');

    const failedItems = returnData.filter(item => item.success === false);
    if (failedItems.length > 0) {
      throw new Error(
        `Error indexing items ${JSON.stringify(failedItems, null, 2)}`
      );
    }

    return returnData;
  } catch (error) {
    console.log(error);
  }
})();
