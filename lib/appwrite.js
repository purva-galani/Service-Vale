// appwrite.js
import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1') // Verify this is correct
  .setProject('681884cf00016b7744dc')              // Verify project ID
  .setPlatform('com.test.servicevale');            // Verify this matches your app

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);

// export const documentId = '648c0f2a1b3d4e5f8c9b'; // Verify this is correct
// export const userId = '648c0f2a1b3d4e5f8c9b'; // Verify this is correct