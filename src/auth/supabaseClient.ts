import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../constants/index';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const onLogin = async (data: { email: string; password: string }) => {
  try {
    const { user, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password
    });
    if (error) {
      throw error;
    }
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
export const onSingUp = async (data: { email: string; password: string }) => {
  try {
    const { user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    });
    if (error) {
      throw error;
    }
    return user;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
