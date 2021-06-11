/* eslint-disable */

// Start Typesense server with `npm run typesenseServer`
// Then run `npm run populateTypesenseIndex` or `node populateTypesenseIndex.js`

const Typesense = require('typesense');

module.exports = (async () => {
  const typesense = new Typesense.Client({
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
    name: 'rss',
    fields: [
      { name: 'category', type: 'string' },
      { name: 'url', type: 'string'},
      { name: 'rssurl', type: 'string'},
      { name: 'rsstext', type: 'string'},
    ],
  };

  console.log('Populating index in Typesense');

  try {
    await typesense.collections('rss').delete();
    console.log('Deleting existing collection: rss');
  } catch (error) {
    // Do nothing
  }

  console.log('Creating schema: ');
  console.log(JSON.stringify(schema, null, 2));
  await typesense.collections().create(schema);

  console.log('Adding records: ');
  const rss = require('../jss.json');
  try {
    const returnData = await typesense
      .collections('rss')
      .documents()
      .import(rss);
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
