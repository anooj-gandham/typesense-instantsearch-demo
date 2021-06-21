/* global instantsearch */

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz', // Be sure to use an API key that only allows searches, in production
    nodes: [
      {
        host: '172.105.148.128',
        port: '8108',
        protocol: 'http',
      },
    ],
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  //  filterBy is managed and overridden by InstantSearch.js. To set it, you want to use one of the filter widgets like refinementList or use the `configure` widget.
  additionalSearchParameters: {
    queryBy: 'description,category',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: 'rss',
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
            <div>
              <div class="hit-name">
                {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
              </div>
              <div class="hit-authors">
                {{ category }}
              </div>
            </div>
          `,
    },
  }),

  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
