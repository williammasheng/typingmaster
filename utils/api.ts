// This file simulates backend interaction.
// In the future, you will replace these setTimeout promises with actual fetch() calls 
// to your Next.js API routes which connect to MySQL.

import { User } from '../types';

export const mockLogin = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate simple validation
      if (email && password) {
        resolve({
          id: 'u_123',
          username: email.split('@')[0], // Use part of email as username for demo
          email: email,
          isAnonymous: false,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

export const mockRegister = async (username: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && email && password) {
        resolve({
          id: 'u_new_' + Date.now(),
          username: username,
          email: email,
          isAnonymous: false,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + username
        });
      } else {
        reject(new Error('Registration failed'));
      }
    }, 1500);
  });
};

export const mockAnonymousLogin = async (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'guest_' + Date.now(),
        username: 'Guest',
        isAnonymous: true,
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=guest'
      });
    }, 500);
  });
};