import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import Work from './index';

// getStaticProps가 내려주는 locale별 데이터 형태: string[][] (0번이 대분류명)
const KO_CATEGORIES = [
  ['M&A·경영권 분쟁', '기업지배구조', '기업인수, 합병, 분할'],
  ['금융·자본시장', '금융거래 분야의 민·상사분쟁'],
];
const EN_CATEGORIES = [
  [
    'M&A, Corporate Operating Rights Disputes',
    'Corporate Structure',
    'Corporate Acquisition, Merger and Spin Off',
  ],
  ['Finance, Capital Markets', 'Civil and Commercial Disputes in Finance'],
];

describe('업무분야 목록 - 언어 전환', () => {
  it('ko 데이터를 렌더한다', () => {
    renderWithProviders(
      <Work categoryInfos={KO_CATEGORIES} language="ko" />,
      'ko',
    );

    expect(screen.getByText('M&A·경영권 분쟁')).toBeInTheDocument();
    expect(screen.getByText('기업지배구조')).toBeInTheDocument();
  });

  it('언어를 전환하면(props 교체) 목록이 새 언어 데이터로 갱신된다', () => {
    // 회귀 방지: 예전에는 categoryInfos를 useState 초기값으로만 받아,
    // 정적 export의 클라이언트 라우팅(/ko/work -> /en/work, 같은 route라 언마운트 없음)
    // 에서 props가 바뀌어도 화면이 한국어로 남아 있었다.
    const { rerenderWithLocale } = renderWithProviders(
      <Work categoryInfos={KO_CATEGORIES} language="ko" />,
      'ko',
    );
    expect(screen.getByText('M&A·경영권 분쟁')).toBeInTheDocument();

    rerenderWithLocale(
      <Work categoryInfos={EN_CATEGORIES} language="en" />,
      'en',
    );

    expect(
      screen.getByText('M&A, Corporate Operating Rights Disputes'),
    ).toBeInTheDocument();
    expect(screen.getByText('Corporate Structure')).toBeInTheDocument();
    expect(screen.queryByText('M&A·경영권 분쟁')).not.toBeInTheDocument();
    expect(screen.queryByText('기업지배구조')).not.toBeInTheDocument();
  });

  it('하위 항목 링크가 전환된 locale 경로를 가리킨다', () => {
    const { rerenderWithLocale } = renderWithProviders(
      <Work categoryInfos={KO_CATEGORIES} language="ko" />,
      'ko',
    );
    expect(screen.getByText('기업지배구조').closest('a')).toHaveAttribute(
      'href',
      '/ko/work/C01#S0101',
    );

    rerenderWithLocale(
      <Work categoryInfos={EN_CATEGORIES} language="en" />,
      'en',
    );

    expect(
      screen.getByText('Corporate Structure').closest('a'),
    ).toHaveAttribute('href', '/en/work/C01#S0101');
  });
});
