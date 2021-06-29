import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz', // Be sure to use an API key that only allows searches, in production
    nodes: [
      {
        host: 'localhost',
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
    queryBy: 'title,description',
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: 'blogs',
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    searchablePlaceholder: 'Search title',
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 8,
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <div class="hit-name"><a href={url}>
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </a>
            </div>
          <div class="hit-authors">
            {{ category }}
          </div>
        </div>
      `,
    },
  }),

  instantsearch.widgets.refinementList({
    limit: 10,
    showMore: true,
    showMoreLimit: 30,
    container: '#category',
    attribute: 'category',
    searchable: true,
    searchablePlaceholder: 'Search Categories',
    showMore: true,
    sortBy: ['name:asc', 'count:desc'],
    cssClasses: {
      searchableInput: 'search-categs-input',
      // searchableSubmit: 'd-none',
      // searchableReset: 'd-none',
      // showMore: 'btn btn-secondary btn-sm',
      // list: 'list-unstyled',
      // count: 'badge text-dark-2 ml-2',
      // label: 'd-flex align-items-center',
      // checkbox: 'mr-2',
    },
  }),
  instantsearch.widgets.clearRefinements({
    container: '#clear-categs',
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
