const nextJest = require('next/jest');

// next/jest는 next.config.js의 SWC 컴파일러를 그대로 쓴다.
// (babel-jest 설정을 넣으면 .babelrc가 생겨 styled-components SWC 변환이 깨진다 — CLAUDE.md 제약)
const createJestConfig = nextJest({ dir: './' });

// tsconfig.json의 paths와 1:1로 맞춘다. tsconfig에 baseUrl이 없어
// next/jest가 paths를 자동 매핑하지 못하므로 여기서 명시한다.
const aliases = {
  '^@Api/(.*)$': '<rootDir>/src/api/$1',
  '^@Components/(.*)$': '<rootDir>/src/components/$1',
  '^@Images/(.*)$': '<rootDir>/src/assets/imgs/$1',
  '^@Fonts/(.*)$': '<rootDir>/src/fonts/$1',
  '^@Interface/(.*)$': '<rootDir>/src/interface/$1',
  '^@Type/(.*)$': '<rootDir>/src/type/$1',
  '^@Pages/(.*)$': '<rootDir>/src/pages/$1',
  '^@Styles/(.*)$': '<rootDir>/src/styles/$1',
  '^@Hooks/(.*)$': '<rootDir>/src/hooks/$1',
  '^@Intl/(.*)$': '<rootDir>/src/intl/$1',
  '^@Assets/(.*)$': '<rootDir>/src/assets/$1',
  '^@Server/(.*)$': '<rootDir>/src/server/$1',
  '^@I18n/(.*)$': '<rootDir>/src/i18n/$1',
  '^@Config/(.*)$': '<rootDir>/src/config/$1',
  '^@Hocs/(.*)$': '<rootDir>/src/hocs/$1',
};

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: aliases,
};

module.exports = createJestConfig(config);
