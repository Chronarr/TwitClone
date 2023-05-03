import { atom } from 'recoil';

export const modalState2 = atom({
  key: 'modalState2', // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});