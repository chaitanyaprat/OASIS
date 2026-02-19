import supabase from "@/supabase-client";
import { useMutation } from "@tanstack/react-query";

const userSignUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    throw "sign up failed" + error;
  }
  return data;
};

const userSignIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw "sign in failed" + error;
  }
  return data;
};

const userSignOut = async (): Promise<null> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw "sign out failed" + error;
  }
  //   setSession(null);
  return null;
};

const signIn = {
  queryFn: async (payload: { email: string; password: string }) =>
    await userSignIn(payload.email, payload.password),
};

const signUp = {
  queryFn: async (payload: { email: string; password: string }) =>
    await userSignUp(payload.email, payload.password),
};

const signOut = {
  queryFn: async () => userSignOut(),
  queryKey: ["logout"],
};

export const useUserSignIn = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      signIn.queryFn(payload),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }
      return data;
    },
    onError: (error) => {
      if (onError) {
        onError();
      }
      throw error;
    },
  });
};
export const useUserSignUp = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      signUp.queryFn(payload),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }
      return data;
    },
    onError: (error) => {
      if (onError) {
        onError();
      }
      throw error;
    },
  });
};
export const useUserSignInOut = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  return useMutation({
    mutationFn: () => signOut.queryFn(),
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }
      return data;
    },
    onError: (error) => {
      if (onError) {
        onError();
      }
      throw error;
    },
  });
};
