import React from 'react';
import { CometChatConversationsWithMessages } from '@cometchat/chat-uikit-react-native';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

type Props = {
  route: RouteProp<RootStackParamList, 'Chat'>;
};

export function ChatScreen({ route }: Props): React.JSX.Element {
  const { user } = route.params;
  
  return (
    <CometChatConversationsWithMessages 
    key="chat-screen"
    user={user}
      messagesConfigurations={{
        hideMessageComposer: false,
        hideMessageHeader: false,
        messageListConfiguration: {
          disableReceipt: false,
          showAvatar: true,
          quickReactionConfiguration: {
            quickReactions: ['👍', '❤️', '😄', '😠', '😢']
          }
        }
      }}
    />
  );
} 