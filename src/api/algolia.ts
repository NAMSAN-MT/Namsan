import algoliasearch from 'algoliasearch/lite';

export const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME ?? '';
export const algoliaClient = algoliasearch(
  process.env.ALGOLIA_ID!,
  process.env.ALGOLIA_SEARCH_KEY!,
);

export const index = algoliaClient.initIndex(INDEX_NAME);
