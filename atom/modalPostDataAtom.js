import { atom } from 'recoil';

export const postDataState = atom({
    key: 'postDataState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
});