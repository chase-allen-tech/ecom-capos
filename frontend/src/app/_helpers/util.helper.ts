export const genRandomOrderString = (length) => {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const toUppercase = (str) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
};

export const handleDate = (str) => {
  return str.split('T')[0];
};

export const abs = (num) => {
  return Math.abs(num);
};

export const round = (num: string) => {
  return num ? parseFloat(num).toFixed(2) : '0.00';
};
