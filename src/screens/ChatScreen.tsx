import React from 'react';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { CometChatMessages } from '@cometchat/chat-uikit-react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = {
  route: RouteProp<RootStackParamList, 'Chat'>;
  navigation: NativeStackNavigationProp<RootStackParamList, 'Chat'>;
};

export function ChatScreen({ route, navigation }: Props): React.JSX.Element {
  const { user } = route.params;

  return (
    <CometChatMessages 
      key="chat-screen"
      user={user}
      messageHeaderConfiguration={{
        onBack: () => navigation.navigate('Conversations')
      }}
      messageListConfiguration={{
        showAvatar: true,
        quickReactionConfiguration: {
          quickReactions: ['👍', '❤️', '😄', '😠', '😢']
        }
      }}
    />
  );
}