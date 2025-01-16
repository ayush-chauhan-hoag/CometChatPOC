import { CometChat } from '@cometchat/chat-sdk-react-native';

/**
 * Type definitions for navigation stack parameters
 */
export type RootStackParamList = {
  Login: undefined;
  Conversations: undefined;
  Chat: {
    user: CometChat.User;
  };
};

/**
 * Type definition for CometChat user data
 */
export interface CometChatUser {
  readonly name: string;
  readonly uid: string;
} 