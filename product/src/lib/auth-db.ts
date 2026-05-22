import { TopikLevel } from './types';
import { createClient } from './supabase/server';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  targetLevel: TopikLevel;
  subscriptionTier: 'free' | 'pro';
}

export const authDb = {
  async getUserByEmail(email: string): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      targetLevel: data.target_level,
      subscriptionTier: data.subscription_tier,
    };
  },

  async createUser(userData: Partial<User>): Promise<User> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: userData.name || 'Unknown',
        email: userData.email || '',
        password: userData.password,
        target_level: userData.targetLevel || 3,
        subscription_tier: userData.subscriptionTier || 'free',
      })
      .select()
      .single();

    if (error || !data) {
      throw new Error(`Failed to create user: ${error?.message}`);
    }

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      targetLevel: data.target_level,
      subscriptionTier: data.subscription_tier,
    };
  },

  async getUserById(id: string): Promise<User | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      targetLevel: data.target_level,
      subscriptionTier: data.subscription_tier,
    };
  },
};
