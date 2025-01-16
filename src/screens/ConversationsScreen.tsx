import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CometChatConversations, AvatarStyleInterface } from '@cometchat/chat-uikit-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import CometChatService from '../services/CometChatService';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Conversations'>;
}

export function ConversationsScreen({ navigation }: Props): React.JSX.Element {
  const handleConversationPress = useCallback((conversation: CometChat.Conversation) => {
    const conversationWith = conversation.getConversationWith();
    if (conversationWith instanceof CometChat.User) {
      navigation.navigate('Chat', { user: conversationWith });
    }
  }, [navigation]);

  const handleLogout = useCallback(async () => {
    try {
      await CometChatService.logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [navigation]);

  const handleComposePress = useCallback(() => {
    navigation.navigate('Users');
  }, [navigation]);


  const avatarStyle: AvatarStyleInterface = {
    border: {
      borderWidth: 2,
      borderColor: '#3399FF',
      borderStyle: "dotted",
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <CometChatConversations 
        title="Chats"
        onItemPress={handleConversationPress}
        showBackButton
        onBack={handleLogout}
        avatarStyle={avatarStyle}
      />
      <TouchableOpacity 
        style={styles.fab}
        onPress={handleComposePress}
      >
        <MaterialIcons name="create" size={24} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3399FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
}); 