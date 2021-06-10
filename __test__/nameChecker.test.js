
import { validateUrl } from "../src/client/js/nameChecker.js";

describe("Correct URLs", () => {
  test("should return true (http)", () => {
    const input = "http://www.udacity.com";
    expect(validateUrl(input)).toBe(true);
  });
  test("should return true (https)", () => {
    const input = "https://www.udacity.com";
    expect(validateUrl(input)).toBe(true);
  });
});

describe("No http(s)/no www", () => {
  test("should return false (no http)", () => {
    const input = "www.udacity.com";
    expect(validateUrl(input)).toBe(false);
  });
  test("should return false (no www)", () => {
    const input = "udacity.com";
    expect(validateUrl(input)).toBe(false);
  });
  
});