import { SearchResponse } from 'instantsearch.js/es/types/algoliasearch';

export type TTab = 'all' | 'media' | 'recent';
export type TPagination = Pick<SearchResponse<unknown>, 'nbPages' | 'page'>;
