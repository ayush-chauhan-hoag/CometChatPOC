import React, { useCallback } from 'react';
import { CometChatConversations } from '@cometchat/chat-uikit-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CometChatService from '../services/cometChat';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Conversations'>;
};

/**
 * Displays list of conversations using CometChat UI components
 * Implements performance optimizations using useCallback
 */
export function ConversationsScreen({ navigation }: Props): React.JSX.Element {
  const handleConversationPress = useCallback((conversation: CometChat.Conversation) => {
    const conversationWith = conversation.getConversationWith();
    if (conversationWith instanceof CometChat.User) {
      navigation.navigate('Chat', { user: conversationWith });
    }
  }, [navigation]);

  
  // Logout and navigate to Login screen
  const handleBackPress = useCallback(async () => {
    try {
      await CometChatService.logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      // Display list of conversations through CometChatConversations component
      <CometChatConversations 
        onItemPress={handleConversationPress}
        conversationsStyle={{
          height: '100%',
          width: '100%'
        }}
        // Show back button and handle back press
        showBackButton={true}
        onBack={handleBackPress}
      />
    </SafeAreaView>
  );
} 