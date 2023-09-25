import Key from "./key";
import { expect, describe, test } from "@jest/globals";

describe("test: get random number", () => {
  const keyClass = new Key();
  const key = "abcdef01234567890";
  let result = "";
  const lengthNumber = 8;
  for (let i = 0; i < lengthNumber; i += 1) {
    result += key[Math.floor(Math.random() * key.length)];
  }
  test("length random number", () => {
    expect(keyClass.getKey().length).toBe(result.length);
  });
});
