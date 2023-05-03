import { atom } from 'recoil';

export const modalActiveConvo = atom({
  key: 'modalActiveConvo', // unique ID (with respect to other atoms/selectors)
  default: "" // default value (aka initial value)
});