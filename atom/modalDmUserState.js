import { atom } from 'recoil';

export const dmUserState = atom({
    key: 'dmUserState', // unique ID (with respect to other atoms/selectors)
    default: {} // default value (aka initial value)
});