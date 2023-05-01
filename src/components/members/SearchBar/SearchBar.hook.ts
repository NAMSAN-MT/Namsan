import React, { useEffect, useState } from 'react';
import { IHooksInterface } from './SearchBar.interface';

const useSerachBar = ({
  defaultOption,
  initOption,
  optionList,
}: IHooksInterface) => {
  const [currentOption, setCurrentOption] = useState(
    initOption || defaultOption,
  );
  const [currentOptionList, setOptionList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const _optionList = [defaultOption, ...optionList];
      setOptionList(_optionList);
    })();
  }, []);

  const _handleClickOption = (event: React.MouseEvent<HTMLDivElement>) => {
    setCurrentOption(event.currentTarget.dataset?.option || currentOption);
    setIsOpen(false);
  };

  const _handleClickSelectBox = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return {
    optionList: currentOptionList,
    currentOption,
    isOpen,
    setIsOpen,
    handleClickOption: _handleClickOption,
    handleClickSelectBox: _handleClickSelectBox,
  };
};

export default useSerachBar;
