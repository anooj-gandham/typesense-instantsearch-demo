/* eslint-disable */

// Start Typesense server with `npm run typesenseServer`
// Then run `npm run populateTypesenseIndex` or `node populateTypesenseIndex.js`

const Typesense = require('typesense');

module.exports = (async () => {
  const typesense = new Typesense.Client({
    nodes: [
      {
        host: '172.105.148.128',
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
      { name: 'url', type: 'string' },
      { name: 'rssurl', type: 'string' },
      { name: 'rsstext', type: 'string' },
    ],
  };

  console.log('Populating index in Typesense');

  try {
    console.log('Deleting existing collection: rss');
    await typesense.collections('rss').delete();
    console.log('Successfully deleted collection ');
  } catch (error) { 
    console.log("Deletion encountered an error " + error);
  }

  console.log('Creating schema: ');
  console.log(JSON.stringify(schema, null, 2));


  console.log("just after schema ");
  console.log(typesense.collections('rss'));

  await typesense.collections().create(schema);
  if (typesense.collections('rss') == null) {
    console.log("rss collections is null. Creating it")
    await typesense.collections().create(schema);
    console.log("rss collections successfully created");
  } else {
    console.log("rss collection is already present" );
    console.log(typesense.collections('rss'));
  }

  var myArgs = process.argv.slice(2);

  console.log('Adding records: ');

  console.log ("myArgs[0] = " + myArgs[0]);
  const rss = require(myArgs[0]);
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
