//Generates random RGB color
export const randomColor = () => {
  const r = Math.floor(Math.random() * 256), // Random between 0-255
    g = Math.floor(Math.random() * 256), // Random between 0-255
    b = Math.floor(Math.random() * 256); // Random between 0-255
  return `rgb(${r},${g},${b})`;
};