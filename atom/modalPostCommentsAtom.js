import { atom } from 'recoil';

export const postCommentsState = atom({
    key: 'postCommentsState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
});