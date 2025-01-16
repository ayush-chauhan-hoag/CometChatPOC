import { CometChat } from '@cometchat/chat-sdk-react-native';
import { CometChatUIKit } from '@cometchat/chat-uikit-react-native';
import { COMETCHAT_CONSTANTS } from '../config/constants';

/**
 * Service class for handling CometChat operations
 * Implements singleton pattern for efficient resource management
 */
class CometChatService {
  private static instance: CometChatService;
  private initialized = false;

  private constructor() {}

  /**
   * Gets singleton instance of CometChatService
   */
  public static getInstance(): CometChatService {
    if (!CometChatService.instance) {
      CometChatService.instance = new CometChatService();
    }
    return CometChatService.instance;
  }

  /**
   * Initializes CometChat SDK with provided configuration
   * Implements lazy loading pattern
   * @throws Error if initialization fails
   */
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await CometChatUIKit.init({
        appId: COMETCHAT_CONSTANTS.APP_ID,
        region: COMETCHAT_CONSTANTS.REGION,
        authKey: COMETCHAT_CONSTANTS.AUTH_KEY
      });
      this.initialized = true;
    } catch (error) {
      console.error('CometChat initialization failed:', error);
      throw new Error('Failed to initialize CometChat');
    }
  }

  /**
   * Authenticates user with CometChat
   * @param uid - User identifier
   * @returns CometChat.User object
   * @throws Error if login fails
   */
  public async login(uid: string): Promise<CometChat.User> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      const user = await CometChat.login(uid, COMETCHAT_CONSTANTS.AUTH_KEY);
      return user;
    } catch (error) {
      console.error('CometChat login failed:', error);
      throw new Error('Failed to login to CometChat');
    }
  }

  /**
   * Logs out current user
   * @throws Error if logout fails
   */
  public async logout(): Promise<void> {
    try {
      await CometChat.logout();
      this.initialized = false;
    } catch (error) {
      console.error('CometChat logout failed:', error);
      throw new Error('Failed to logout from CometChat');
    }
  }
}

export default CometChatService.getInstance(); 