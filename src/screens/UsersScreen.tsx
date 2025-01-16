import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CometChatUsers } from '@cometchat/chat-uikit-react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { CometChat } from '@cometchat/chat-sdk-react-native';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Users'>;
}

/**
 * UsersScreen Component
 * Displays searchable list of CometChat users using the default Users component
 */
export function UsersScreen({ navigation }: Props): React.JSX.Element {
  const handleUserSelect = useCallback((user: CometChat.User) => {
    navigation.navigate('Chat', { user });
  }, [navigation]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <CometChatUsers 
        onItemPress={handleUserSelect}
        onBack={handleBack}
        showBackButton
      />
    </SafeAreaView>
  );
} 