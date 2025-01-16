import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AVAILABLE_USERS } from '../config/users';
import CometChatService from '../services/cometChat';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

/**
 * Screen component that displays a list of available users and handles login functionality
 * @param navigation - Navigation prop for screen routing
 * @returns React component
 */
export function LoginScreen({ navigation }: Props): React.JSX.Element {
  /**
   * Handles user selection and login process
   * Initializes CometChat, logs in the selected user, and navigates to Conversations screen
   * @param uid - Selected user's unique identifier
   */
  const handleUserSelect = async (uid: string) => {
    try {
      await CometChatService.initialize();
      await CometChatService.login(uid);
      navigation.replace('Conversations');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // Main container with padding and white background
    <View style={styles.container}>
      {/* Title text at the top of the screen */}
      <Text style={styles.title}>Select a User to Login</Text>

      {/* Scrollable list of users */}
      <ScrollView style={styles.userList}>
        {/* Map through available users array to create buttons */}
        {AVAILABLE_USERS.map((user) => (
          // Touchable button for each user
          <TouchableOpacity
            key={user.uid} // Unique key for React list rendering
            style={styles.userButton}
            onPress={() => handleUserSelect(user.uid)} // Login handler when pressed
          >
            {/* Display user's name */}
            <Text style={styles.userName}>{user.name}</Text>
            {/* Display user's ID below name */}
            <Text style={styles.userId}>{user.uid}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userList: {
    flex: 1,
  },
  userButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
  },
  userId: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
}); 