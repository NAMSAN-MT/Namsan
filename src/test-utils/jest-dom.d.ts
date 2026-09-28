// jest.setup.js가 런타임에 로드하는 @testing-library/jest-dom의 matcher 타입을
// tsc(`pnpm typecheck`)에도 알려준다. 이 파일이 없으면 toBeInTheDocument 등이
// JestMatchers에 없다며 TS2339가 난다.
import '@testing-library/jest-dom';
