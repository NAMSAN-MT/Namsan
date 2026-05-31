import algoliasearch from 'algoliasearch/lite';

export const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? '';
export const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
);

export const index = algoliaClient.initIndex(`${INDEX_NAME}_order_desc`);
