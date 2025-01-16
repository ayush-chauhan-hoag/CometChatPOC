import type { CometChatConfig } from '../types/cometchat';

export const COMETCHAT_CONFIG: CometChatConfig = {
  appId: '268221e82b755c98',
  region: 'us',
  authKey: 'd6d3db1a1283cd43d93cae8cf4095e0b75945556'
};

export const DEMO_USERS = [
  { name: 'Andrew Joseph', uid: 'cometchat-uid-1' },
  { name: 'George Alan', uid: 'cometchat-uid-2' },
  { name: 'Nancy Grace', uid: 'cometchat-uid-3' },
  { name: 'Susan Marie', uid: 'cometchat-uid-4' },
  { name: 'John Paul', uid: 'cometchat-uid-5' }
] as const; 