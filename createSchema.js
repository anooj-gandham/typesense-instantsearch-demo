#!/usr/bin/node

const Typesense = require('typesense');
const _ = require('lodash');
module.exports = (async() => {
    const typesense = new Typesense.Client({
        nodes: [{
            host: 'localhost',
            port: '8108',
            protocol: 'http',
        }, ],

        apiKey: 'xyz',
    });

    const schema = {
        name: 'blogs',
        // title, description, url, category
        fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'url', type: 'string' },
            { name: 'category', type: 'string' },
        ],
    };

    const collections = await typesense.collections().retrieve();
    const collectionNames = collections.map(collection => {
        return collection.name;
    });
    console.log(collectionNames);
    try {
        if (_.includes(collectionNames, 'blogs') === false) {
            await typesense.collections().create(schema);
        }
    } catch (error) {
        console.error(error);
    }
})();
