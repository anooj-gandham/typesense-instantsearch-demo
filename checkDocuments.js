const Typesense = require('typesense');
const _ = require('lodash');
module.exports = (async () => {
  const client = new Typesense.Client({
    nodes: [
      {
        host: 'localhost',
        port: '8108',
        protocol: 'http',
      },
    ],
    apiKey: 'FixO5HtCLHbZhg92OevOl4Yt6SNwZ17TXWfI2RCmsL0GshIu',
  });
  const collections = await client.collections().retrieve();
  const collectionNames = collections.map(collection => {
    return collection.name;
  });
  console.log(collectionNames);
  collectionNames.map(c => {
    try {
      const returnData = await client
        .collections(c)
        .documents()
        .export();
      console.log(
        `No of documents in collection ${c}: `,
        returnData.match(/}/g).length
      );
    } catch (error) {
      console.log(error);
    }
  })
})();
