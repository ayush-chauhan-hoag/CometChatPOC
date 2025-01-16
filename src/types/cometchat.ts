import { CometChat } from '@cometchat/chat-sdk-react-native';

export interface CometChatConfig {
  appId: string;
  region: string;
  authKey: string;
}

export interface CometChatUser {
  name: string;
  uid: string;
}

export interface ConversationProps {
  user: CometChat.User;
  onBackPress?: () => void;
} 