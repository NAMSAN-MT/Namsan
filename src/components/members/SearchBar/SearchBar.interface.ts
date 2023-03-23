import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface ISearchBar extends WrappedComponentProps {}

interface IHooksInterface {
  defaultOption: string;
  initOption: string;
  getOptionList: () => Promise<string[]>;
}

export { ISearchBar, IHooksInterface };
