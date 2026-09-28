import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import DetailPage, { MiniMember } from './DetailPage';
import { CategoryDescription } from './work.interface';

// 화면 텍스트와 무관한 무거운 의존성만 대체한다 (lottie는 canvas/애니메이션, 이미지는 next/image 로더)
jest.mock('@Components/common/LottieWrapper/LottieWrapper', () => ({
  __esModule: true,
  default: () => <div data-testid="lottie" />,
}));
jest.mock('@Components/common/AppImage', () => ({
  __esModule: true,
  default: () => <div data-testid="app-image" />,
}));
jest.mock('@Components/members/MemberItem', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <li>{name}</li>,
}));

// pages/[locale]/work/[id].tsx가 props로부터 workInfo를 만드는 방식과 동일
const buildWorkInfo = (
  titles: string[],
  descriptions: string[],
): CategoryDescription[] =>
  titles.map((categoryTitle, index) => ({
    categoryTitle,
    description: descriptions[index],
    isOpen: false,
    isFirstTime: true,
  }));

const KO_INFO = buildWorkInfo(
  ['M&A·경영권 분쟁', '기업지배구조', '기업인수, 합병, 분할'],
  [
    '남산은 M&A 업무를 수행해 왔습니다.',
    '지배구조 관련 자문을 제공합니다.',
    '인수합병 절차를 자문합니다.',
  ],
);
const EN_INFO = buildWorkInfo(
  [
    'M&A, Corporate Operating Rights Disputes',
    'Corporate Structure',
    'Corporate Acquisition, Merger and Spin Off',
  ],
  [
    'Lim, Chung & Suh has extensive experience in M&A.',
    'We advise on corporate structure.',
    'We advise on acquisitions.',
  ],
);

const MEMBERS: MiniMember[] = [];

const renderDetail = (
  info: CategoryDescription[],
  language: 'ko' | 'en',
  id = 'C01',
) => (
  <DetailPage
    id={id}
    language={language}
    subId={-1}
    mainMemberData={MEMBERS}
    subMemberData={MEMBERS}
    workInfo={info}
  />
);

describe('업무분야 상세 - 언어 전환', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('ko 본문을 렌더한다', () => {
    renderWithProviders(renderDetail(KO_INFO, 'ko'), 'ko');

    expect(screen.getByText('M&A·경영권 분쟁')).toBeInTheDocument();
    expect(screen.getByText('기업지배구조')).toBeInTheDocument();
  });

  it('언어를 전환하면(props 교체) 본문이 새 언어로 갱신된다', () => {
    // 회귀 방지: 예전에는 workInfo를 useState 초기값으로만 받아서,
    // /ko/work/C01 -> /en/work/C01 클라이언트 라우팅 시 (같은 route라 언마운트 없음)
    // GNB만 영문으로 바뀌고 본문은 한국어로 남아 있었다.
    const { rerenderWithLocale } = renderWithProviders(
      renderDetail(KO_INFO, 'ko'),
      'ko',
    );
    expect(screen.getByText('M&A·경영권 분쟁')).toBeInTheDocument();

    rerenderWithLocale(renderDetail(EN_INFO, 'en'), 'en');

    expect(
      screen.getByText('M&A, Corporate Operating Rights Disputes'),
    ).toBeInTheDocument();
    expect(screen.getByText('Corporate Structure')).toBeInTheDocument();
    expect(screen.queryByText('M&A·경영권 분쟁')).not.toBeInTheDocument();
    expect(screen.queryByText('기업지배구조')).not.toBeInTheDocument();
  });

  it('다른 업무분야(id)로 이동하면 본문이 갱신된다', () => {
    const OTHER = buildWorkInfo(['금융·자본시장'], ['금융 분야 자문']);
    const { rerenderWithLocale } = renderWithProviders(
      renderDetail(KO_INFO, 'ko', 'C01'),
      'ko',
    );
    expect(screen.getByText('M&A·경영권 분쟁')).toBeInTheDocument();

    rerenderWithLocale(renderDetail(OTHER, 'ko', 'C02'), 'ko');

    expect(screen.getByText('금융·자본시장')).toBeInTheDocument();
    expect(screen.queryByText('M&A·경영권 분쟁')).not.toBeInTheDocument();
  });

  it('섹션 헤더 클릭으로 펼침/접힘이 동작한다 (회귀 방지)', () => {
    renderWithProviders(renderDetail(KO_INFO, 'ko'), 'ko');

    expect(
      screen.queryByText('지배구조 관련 자문을 제공합니다.'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('기업지배구조'));
    expect(
      screen.getByText('지배구조 관련 자문을 제공합니다.'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('기업지배구조'));
    expect(
      screen.queryByText('지배구조 관련 자문을 제공합니다.'),
    ).not.toBeInTheDocument();
  });

  it('해시 딥링크(#S0102)가 해당 섹션을 연다 (회귀 방지)', () => {
    window.location.hash = '#S0102';

    renderWithProviders(renderDetail(KO_INFO, 'ko'), 'ko');

    // index 2 = '기업인수, 합병, 분할'
    expect(screen.getByText('인수합병 절차를 자문합니다.')).toBeInTheDocument();
    expect(
      screen.queryByText('지배구조 관련 자문을 제공합니다.'),
    ).not.toBeInTheDocument();
  });

  it('해시 없이 진입하면 모든 하위 섹션이 닫혀 있다 (하이드레이션 안전)', () => {
    renderWithProviders(renderDetail(KO_INFO, 'ko'), 'ko');

    expect(
      screen.queryByText('지배구조 관련 자문을 제공합니다.'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('인수합병 절차를 자문합니다.'),
    ).not.toBeInTheDocument();
    // 0번 섹션(대표 설명)은 항상 노출된다
    expect(
      screen.getByText('남산은 M&A 업무를 수행해 왔습니다.'),
    ).toBeInTheDocument();
  });
});
