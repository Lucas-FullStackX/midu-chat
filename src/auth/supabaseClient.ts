import { supabaseClient } from '@supabase/auth-helpers-nextjs';

export const onLogin = async (data: { email: string; password: string }) => {
  try {
    const { user, error } = await supabaseClient.auth.signIn({
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
    const { user, error } = await supabaseClient.auth.signUp({
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
