import { WrappedComponentProps } from 'gatsby-plugin-intl';

interface ISearchBar extends WrappedComponentProps {}

interface IHooksInterface {
  defaultOption: string;
  initOption: string;
  optionList: string[];
}

export { ISearchBar, IHooksInterface };
