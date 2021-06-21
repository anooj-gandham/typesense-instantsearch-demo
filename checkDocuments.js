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

    try {
        // const document = await typesense
        //     .collections('blogs')
        //     .documents()
        //     .export();
        console.log(
            await typesense
            .collections('blogs')
            .documents()
            .export()
        );
        // console.log(
        //     typesense
        //     .collections('blogs')
        //     .documents()
        //     .export()
        // );
    } catch (error) {
        console.log(error);
    }
})();