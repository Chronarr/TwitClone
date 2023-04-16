import { atom } from 'recoil';

export const postUserState = atom({
    key: 'postUserState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
});