import algoliasearch from 'algoliasearch/lite';

export const INDEX_NAME = process.env.GATSBY_ALGOLIA_INDEX_NAME ?? '';
export const algoliaClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_ID!,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY!,
);

export const index = algoliaClient.initIndex(`${INDEX_NAME}_order_desc`);
