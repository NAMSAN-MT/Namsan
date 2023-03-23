import React, { useEffect, useState } from 'react';
import { IHooksInterface } from './SearchBar.interface';

const useSerachBar = ({
  defaultOption,
  initOption,
  getOptionList,
}: IHooksInterface) => {
  const [currentOption, setCurrentOption] = useState(
    initOption || defaultOption,
  );
  const [optionList, setOptionList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const _optionList = [defaultOption, ...(await getOptionList())];
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
    optionList,
    currentOption,
    isOpen,
    setIsOpen,
    handleClickOption: _handleClickOption,
    handleClickSelectBox: _handleClickSelectBox,
  };
};

export default useSerachBar;
