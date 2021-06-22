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
    apiKey: 'xyz',
  });
  try {
    const returnData = await client
      .collections('blogs')
      .documents()
      .export();
    console.log(
      'No of documents in collection blogs: ',
      returnData.match(/}/g).length
    );
  } catch (error) {
    console.log(error);
  }
})();
