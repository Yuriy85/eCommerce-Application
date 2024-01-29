import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.ts",
    "\\events": "<rootDir>/__mocks__/events.ts",
    "\\products": "<rootDir>/__mocks__/products.ts",
    "\\customer": "<rootDir>/__mocks__/customer.ts",
  },
};

export default config;
