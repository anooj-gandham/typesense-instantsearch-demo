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
})();
