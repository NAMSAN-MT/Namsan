import { renderHook } from '@testing-library/react';
import React from 'react';
import useGNB from './GNB.hook';

const push = jest.fn();
let asPath = '/ko/work/';
let locale = 'ko';

jest.mock('next/router', () => ({
  useRouter: () => ({ push, asPath }),
}));
jest.mock('next-intl', () => ({
  useLocale: () => locale,
}));

// 실제로 쓰이는 필드(preventDefault, target.dataset.lang)만 갖춘 최소 이벤트
const makeClickEvent = (lang?: string) =>
  ({
    preventDefault: jest.fn(),
    target: { dataset: lang ? { lang } : {} },
  } as unknown as React.MouseEvent<HTMLElement>);

const clickLang = (lang?: string) => {
  const { result } = renderHook(() => useGNB());
  result.current.handleChangeLanguage(makeClickEvent(lang));
};

describe('GNB 언어 전환 라우팅', () => {
  beforeEach(() => {
    push.mockClear();
    locale = 'ko';
  });

  it('업무분야 목록에서 EN을 누르면 /en/work 로 이동한다', () => {
    asPath = '/ko/work/';
    clickLang('en');
    expect(push).toHaveBeenCalledWith('/en/work');
  });

  it('업무분야 상세에서 EN을 누르면 같은 업무분야의 영문 경로로 이동한다', () => {
    asPath = '/ko/work/C01/';
    clickLang('en');
    expect(push).toHaveBeenCalledWith('/en/work/C01');
  });

  it('영문 상세에서 KOR을 누르면 국문 경로로 돌아온다', () => {
    locale = 'en';
    asPath = '/en/work/C01/';
    clickLang('ko');
    expect(push).toHaveBeenCalledWith('/ko/work/C01');
  });

  it('로케일 홈에서는 홈으로 이동한다', () => {
    asPath = '/ko/';
    clickLang('en');
    expect(push).toHaveBeenCalledWith('/en/');
  });

  it('현재 언어를 다시 누르면 이동하지 않는다', () => {
    asPath = '/ko/work/';
    clickLang('ko');
    expect(push).not.toHaveBeenCalled();
  });

  it('data-lang이 없는 영역을 누르면 이동하지 않는다', () => {
    asPath = '/ko/work/';
    clickLang(undefined);
    expect(push).not.toHaveBeenCalled();
  });

  it('쿼리스트링은 떼고 경로만 치환한다', () => {
    asPath = '/ko/news/?page=2';
    clickLang('en');
    expect(push).toHaveBeenCalledWith('/en/news');
  });
});
