export const nameValidation = (str: string) => {
  const regName = /^[А-ЯЁA-Z][а-яёa-z]*\S*$/;
  return !!str.match(regName);
};

export const loginValidation = (str: string) => {
  const regName = /^[A-Za-z0-9-_]{2,20}\S$/;
  return !!str.match(regName);
};

export const emailValidation = (str: string) => {
  const regName = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
  return !!str.match(regName);
};
export const passwordValidation = (str: string) => {
  const regName = /(?=^.{8,}$)(?=.*\d)(?!\s)(?=.*[A-Z])(?=.*[a-z]).*/;
  return !!str.match(regName);
};

export const phonedValidation = (str: string) => {
  const regName = /(?:\+|\d)\d{9,15}\d/;
  return !!str.match(regName);
};

export const FORM_ERRORS = {
  first_name: "Буквы с заглавной буквы, без пробелов",
  second_name: "Буквы с заглавной буквы, без пробелов",
  login: "От 3 до 20 и без спецсимволов",
  email: "Введите существующий email",
  password: "От 8 символов, обязательно одна цифра и заглавная буква",
  phone: "Неверный формат номера",
};
