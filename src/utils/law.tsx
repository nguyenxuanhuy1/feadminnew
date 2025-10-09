export const dieuOptions = Array.from({ length: 300 }, (_, i) => {
  const label = `Điều ${i + 1}`;
  return { value: label, label };
});
export const diemOptions = [
  "a",
  "b",
  "c",
  "d",
  "đ",
  "e",
  "g",
  "h",
  "i",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "x",
  "y",
  "z",
].map((char) => ({
  value: `Điểm ${char}`,
  label: `Điểm ${char}`,
}));

export const khoanOptions = Array.from({ length: 20 }, (_, i) => ({
  value: `Khoản ${i + 1}`,
  label: `Khoản ${i + 1}`,
}));
