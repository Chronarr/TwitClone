import { atom } from 'recoil';

export const modalCropStatus = atom({
  key: 'modalCropStatus', // unique ID (with respect to other atoms/selectors)
  default: false // default value (aka initial value)
});