import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Next.js 앱의 경로 (보통 현재 폴더)
});

const config: Config = {
  // 'jest-environment-jsdom': 브라우저 환경을 흉내 냄 (window, document 객체 사용 가능)
  testEnvironment: "jest-environment-jsdom",
  // 각 테스트 실행 전 실행할 셋업 파일 (Matcher 확장 등)
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // 절대 경로(@/) 사용 시 필요 (tsconfig.json에 맞춰 수정)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // 경로 별칭(@) 처리
  },
};

export default createJestConfig(config);
