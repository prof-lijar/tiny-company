import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a mock or a client that won't crash during build
    // createBrowserClient will throw if these are missing.
    // We can return a proxy or handle this in the components.
    // For build purposes, we can provide empty strings or a placeholder.
    return createBrowserClient(url || 'https://placeholder.supabase.co', key || 'placeholder-key');
  }

  return createBrowserClient(url, key);
}
