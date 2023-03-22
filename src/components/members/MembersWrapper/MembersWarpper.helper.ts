import { ISearchParams } from './MembersWrapper.interface';

const getSearchParams = (): ISearchParams => {
  const params = new URLSearchParams(document.location.search);
  const name = params.get('name') || '';
  const position = params.get('position') || '';
  const businessField = params.get('businessField') || '';
  return { name, position, businessField };
};

export { getSearchParams };
