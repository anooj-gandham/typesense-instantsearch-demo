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

  const schema = {
    name: 'blogs',
    fields: [
      { name: 'title', type: 'string' },
      { name: 'category', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'description', type: 'string' },
    ],
  };
  const collections = await client.collections().retrieve();
  const collectionNames = collections.map(collection => {
    return collection.name;
  });
  console.log(collectionNames);
  try {
    if (_.includes(collectionNames, 'blogs') === false) {
      await client.collections().create(schema);
      console.log('Collection blogs created successfully');
    } else {
      console.log('Collection blogs already present');
    }
  } catch (error) {
    console.error(error);
  }
})();
