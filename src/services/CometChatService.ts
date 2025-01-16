import { CometChat } from '@cometchat/chat-sdk-react-native';
import { CometChatUIKit } from '@cometchat/chat-uikit-react-native';
import { COMETCHAT_CONFIG } from '../config/environment';
import type { CometChatConfig } from '../types/cometchat';

class CometChatService {
  private static instance: CometChatService;
  private initialized = false;
  private config: CometChatConfig;

  private constructor() {
    this.config = COMETCHAT_CONFIG;
  }

  public static getInstance(): CometChatService {
    if (!this.instance) {
      this.instance = new CometChatService();
    }
    return this.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      await CometChatUIKit.init({
        appId: this.config.appId,
        region: this.config.region,
        authKey: this.config.authKey
      });
      this.initialized = true;
    } catch (error) {
      console.error('CometChat initialization failed:', error);
      throw new Error('Failed to initialize CometChat');
    }
  }

  public async login(uid: string): Promise<CometChat.User> {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      return await CometChat.login(uid, this.config.authKey);
    } catch (error) {
      console.error('CometChat login failed:', error);
      throw new Error('Failed to login to CometChat');
    }
  }

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