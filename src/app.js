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
    queryBy: 'text',
    highlightAffixNumTokens: 15,
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const search = instantsearch({
  searchClient,
  indexName: 'blogs',
  // https://stackoverflow.com/questions/37801289/how-do-i-set-algolia-to-not-return-any-results-if-the-query-is-blank
  searchFunction(helper) {
    const hits = document.querySelector('#hits');
    const pagination = document.querySelector('#pagination');
    const filter = document.querySelector('.filter-box');
    const empty = document.querySelector('.empty');

    hits.style.display = helper.state.query === '' ? 'none' : '';
    pagination.style.display = helper.state.query === '' ? 'none' : '';
    filter.style.display = helper.state.query === '' ? 'none' : '';
    empty.style.display = helper.state.query !== '' ? 'none' : '';

    helper.search();
  },
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for Blogs... ',
  }),
  instantsearch.widgets.configure({
    hitsPerPage: 10,
    // attributesToSnippet: ['text: 20'],
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <div>
          <div class="hit-name"><a href={{url}}>
            {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
          </a>
            </div>
            <div>{{#helpers.snippet}}{ "attribute": "text" }{{/helpers.snippet}}</div>
            <div class="hit-authors">
            {{ category }}
          </div>
        </div>
      `,
    },
  }),

  instantsearch.widgets.refinementList({
    limit: 5,
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
    },
  }),
  instantsearch.widgets.refinementList({
    limit: 3,
    container: '#aud',
    attribute: 'aud',
  }),
  instantsearch.widgets.rangeSlider({
    container: '#read_time',
    attribute: 'read_time',
    step: 1,
  }),

  instantsearch.widgets.clearRefinements({
    container: '#clear-categs',
    templates: {
      resetLabel: 'Clear filters',
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
]);

search.start();
