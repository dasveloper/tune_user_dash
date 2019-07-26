import { randomColor } from "./randomColor";

test('generates random color', () => {
  const matchRGB = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
  expect(randomColor()).toMatch(matchRGB);
});
