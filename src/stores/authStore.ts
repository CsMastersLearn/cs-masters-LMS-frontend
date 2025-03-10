import { ref } from 'vue';
import { defineStore } from 'pinia';
import { auth } from '@/utils/supabase';
import { useErrorStore } from './errorStore';
import type { Subscription } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const userSession = ref();

  const errorStore = useErrorStore();

  let subscribedSession: { subscription: Subscription } | null = null;

  async function registerAuthListner() {
    const { data } = auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
        userSession.value = session;
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
        userSession.value = null;
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    });

    subscribedSession = data;
  }

  async function removeAuthListner() {
    if (subscribedSession) {
      subscribedSession.subscription.unsubscribe();
    }
  }

  async function getSession() {
    const { data, error } = await auth.getSession();

    if (error) {
      errorStore.setError(error.message);
      return { error };
    } else {
      errorStore.resetError();
      return { data };
    }
  }

  async function signUpUser(name: string, email: string, password: string) {
    const { error } = await auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: name,
        },
      },
    });

    if (error) {
      errorStore.setError(error.message);
      return error;
    } else {
      errorStore.resetError();
    }
  }

  async function signInUser(email: string, password: string) {
    const { error } = await auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      errorStore.setError(error.message);
      return error;
    } else {
      errorStore.resetError();
    }
  }

  async function logoutUser() {
    const { error } = await auth.signOut();

    if (error) {
      errorStore.setError(error.message);
      return error;
    } else {
      errorStore.resetError();
    }
  }

  return { removeAuthListner, registerAuthListner, getSession, signUpUser, signInUser, logoutUser };
});
