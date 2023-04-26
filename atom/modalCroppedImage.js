import { atom } from 'recoil';

export const modalCroppedImage = atom({
  key: 'modalCroppedImage', // unique ID (with respect to other atoms/selectors)
  default: "" // default value (aka initial value)
});