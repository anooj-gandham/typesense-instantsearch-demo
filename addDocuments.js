const Typesense = require('typesense');
const fs = require('fs');
module.exports = (async() => {
    const typesense = new Typesense.Client({
        nodes: [{
            host: '172.105.148.128',
            port: '8108',
            protocol: 'http',
        }, ],
        apiKey: 'xyz',
    });

    var myArgs = process.argv.slice(2);

    console.log('Adding records: ');

    try {
        const docs = fs.readFile(myArgs[0], 'utf8', (err, data) => {
            // console.log(err);
        });
        const returnData = await typesense
            .collections('blogs')
            .documents()
            .import(docs, { batch_size: 100 });
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