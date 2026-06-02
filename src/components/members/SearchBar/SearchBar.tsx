import * as S from './SearchBar.style';
import React, { useCallback, useEffect, useState } from 'react';
import SelectBox from '../SelectBox';
import useSearchBar from './SearchBar.hook';
import Input from '../../common/Input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { IMember } from '../../../interface/api.interface';

const SearchBar = ({
  members,
  workMap,
}: {
  members: IMember[];
  workMap: { [x: string]: string };
}) => {
  // Hooks
  const t = useTranslations();
  const router = useRouter();

  // Filter state comes from the URL query so controls stay in sync under
  // shallow routing and we never read `document` during render (hydration-safe).
  const initPosition = (router.query.position as string) || '';
  const initBusinessField = (router.query.businessField as string) || '';

  // State
  const [name, setName] = useState<string>('');
  useEffect(() => {
    setName((router.query.name as string) || '');
  }, [router.query.name]);

  const INIT_POSITION_OPTION = t('members.total_position');
  const INIT_BUSINESS_FIELD_OPTION = t('members.total_business_field');

  const positionList =
    members?.map(member => member.position.split('/')[0]) || [];
  const uniquePositionList = [...new Set(positionList)];

  const tmp: string[] = [];
  const businessFieldList =
    members
      ?.map(member => member.businessFields)
      ?.flat()
      .sort((a: string, b: string) => {
        if (!workMap[a]) {
          tmp.push(a);
        }

        const numberA = Number(workMap[a]?.slice(1));
        const numberB = Number(workMap[b]?.slice(1));

        return numberA > numberB ? 1 : -1;
      }) || [];

  const uniqueBusinessFieldList = [...new Set(businessFieldList)];

  const {
    optionList: positionOptionList,
    currentOption: currentPosition,
    isOpen: isPositionSelectOpen,
    setIsOpen: setIsPositionSelectOpen,
    handleClickOption: handleClickPositionOption,
    handleClickSelectBox: handleClickPositionSelectBox,
  } = useSearchBar({
    defaultOption: INIT_POSITION_OPTION,
    initOption: initPosition,
    optionList: uniquePositionList,
  });

  const {
    optionList: businessFieldOptionList,
    currentOption: currentBusinessField,
    isOpen: isBusinessFieldSelectOpen,
    setIsOpen: setIsBusinessFieldSelectOpen,
    handleClickOption: handleClickBusinessFieldOption,
    handleClickSelectBox: handleClickBusinessFieldSelectBox,
  } = useSearchBar({
    defaultOption: INIT_BUSINESS_FIELD_OPTION,
    initOption: initBusinessField,
    optionList: uniqueBusinessFieldList,
  });

  // Handlers
  const _handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const position =
      currentPosition === INIT_POSITION_OPTION ? '' : currentPosition;
    const businessField =
      currentBusinessField === INIT_BUSINESS_FIELD_OPTION
        ? ''
        : currentBusinessField;

    const search = `?position=${encodeURIComponent(
      position,
    )}&businessField=${encodeURIComponent(
      businessField,
    )}&name=${encodeURIComponent(name)}`;
    const pathname = router.asPath.split('?')[0];
    router.push(`${pathname}${search}`, undefined, { shallow: true });
  };

  const _handleBlur = useCallback(() => {
    setIsPositionSelectOpen(false);
    setIsBusinessFieldSelectOpen(false);
  }, []);

  const _handleClickPositionSelectBox = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    handleClickPositionSelectBox(event);
    setIsBusinessFieldSelectOpen(false);
  };

  const _handleClickBusinessFieldSelectBox = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    handleClickBusinessFieldSelectBox(event);
    setIsPositionSelectOpen(false);
  };

  const _handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('click', _handleBlur);
    return () => {
      window.removeEventListener('click', _handleBlur);
    };
  }, []);

  return (
    <div>
      <S.SearchBarWrapper>
        <S.ItemWrapper
          key="position_wrapper"
          width="282px"
          data-id="position"
          onClick={_handleClickPositionSelectBox}
        >
          <SelectBox
            key="position"
            title={currentPosition}
            options={positionOptionList}
            handleClick={handleClickPositionOption}
            currentOption={currentPosition}
            isOpen={isPositionSelectOpen}
            setOpen={setIsPositionSelectOpen}
          />
        </S.ItemWrapper>
        <S.ItemWrapper
          key="businessField_wrapper"
          width="384px"
          data-id="businessField"
          onClick={_handleClickBusinessFieldSelectBox}
        >
          <SelectBox
            key="businessField"
            title={currentBusinessField}
            options={businessFieldOptionList}
            handleClick={handleClickBusinessFieldOption}
            currentOption={currentBusinessField}
            isOpen={isBusinessFieldSelectOpen}
            setOpen={setIsBusinessFieldSelectOpen}
          />
        </S.ItemWrapper>
        <S.ItemWrapper width="486px">
          <Input
            handleSubmit={_handleSubmit}
            placeholder={t('members.search_placeholder')}
            value={name}
            handleChange={_handleNameChange}
          />
        </S.ItemWrapper>
      </S.SearchBarWrapper>
    </div>
  );
};

export default SearchBar;
