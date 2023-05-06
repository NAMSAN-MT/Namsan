import { getFileFromStorage } from '@Api/index.api';
import BaseButton from '@Components/common/BaseButton';
import LineArrowIcon from '@Components/icons/LineArrowIcon';
import { navigate } from 'gatsby';
import { injectIntl } from 'gatsby-plugin-intl';
import React, { useEffect, useState } from 'react';
import { convertDateStr } from './NewsDetail.helper';
import { Props } from './NewsDetail.interface';
import * as S from './NewsDetail.style';

const NewsDetail = (props: Props) => {
  const { agency, newsType, originalLink, title, content, date, imagePath } =
    props;
  const dateYearMonthDate = convertDateStr(date);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    imagePath && getFileFromStorage(imagePath).then(setImage);
  }, []);

  const onClickOiriginal = () => {
    window.open(originalLink ?? '', '_blank');
  };
  const handleClickList = () => {
    navigate(`/${props.intl.locale}/news`);
  };
  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const isMediaNews = newsType === 'media' && image;
  const topTxt = isMediaNews ? agency : '최근 업무사례';

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <S.TopText newsType={newsType}>{topTxt}</S.TopText>
        <S.TitleArea>
          <LineArrowIcon
            direction="LEFT"
            weight="LIGHT"
            width="60px"
            height="60px"
          />
          <h1>{title}</h1>
          <LineArrowIcon
            direction="RIGHT"
            weight="LIGHT"
            width="60px"
            height="60px"
          />
        </S.TitleArea>
        <S.HeaderDivder />
        <S.DateARea>{dateYearMonthDate}</S.DateARea>
      </S.HeaderContainer>
      <S.ContentConatiner>
        {isMediaNews && (
          <article className="top">
            <img src={image} alt={title} loading={'lazy'} />
          </article>
        )}
        <S.Content>{content}</S.Content>
        <article className="bottom">
          {/* 프로필 정보 */}
          {!isMediaNews && <img src="" alt="" />}
          <BaseButton className={'support'} onClick={onClickOiriginal}>
            기사 원문보기
          </BaseButton>
        </article>
      </S.ContentConatiner>
      <S.BottomConatiner>
        <div className="action__area">
          <div className="prev">
            <button datatype="prev" onClick={handleMove}>
              <LineArrowIcon direction={'LEFT'} weight="NORMAL" />
              <p>이전글</p>
            </button>
            <p>양원석 남산 경영담당 변호사, 대표변호사로 취임</p>
          </div>
          <S.ListIconWrapper>
            <BaseButton className="hamburger-news" onClick={handleClickList} />
          </S.ListIconWrapper>
          <div className="next">
            <p>양원석 남산 경영담당 변호사, 대표변호사로 취임</p>
            <button datatype="next" onClick={handleMove}>
              <p>다음글</p>
              <LineArrowIcon direction={'RIGHT'} weight="NORMAL" />
            </button>
          </div>
        </div>
      </S.BottomConatiner>
    </S.Wrapper>
  );
};

export default injectIntl(NewsDetail);
