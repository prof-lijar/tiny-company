import { TopikLevel } from './types';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  targetLevel: TopikLevel;
  subscriptionTier: 'free' | 'pro';
}

// Mock database in-memory storage
const users: User[] = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    targetLevel: 4,
    subscriptionTier: 'pro',
  },
];

export const authDb = {
  async getUserByEmail(email: string): Promise<User | null> {
    return users.find((u) => u.email === email) || null;
  },

  async createUser(userData: Partial<User>): Promise<User> {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      name: userData.name || 'Unknown',
      email: userData.email || '',
      password: userData.password,
      targetLevel: userData.targetLevel || 3,
      subscriptionTier: userData.subscriptionTier || 'free',
    };
    users.push(newUser);
    return newUser;
  },

  async getUserById(id: string): Promise<User | null> {
    return users.find((u) => u.id === id) || null;
  },
};
