//create Auth context
//create a wrapper component to provide current session and user data
//create a hook to provide access  to current context

import supabase from "@/supabase-client";
import { Session, User, WeakPassword } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthConextType {
  session: Session | null | undefined;
  signInUser: (
    email: string,
    password: string
  ) => Promise<{
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  } | null>;
  singUpUser: (
    email: string,
    password: string
  ) => Promise<{
    user: User | null;
    session: Session | null;
  } | null>;
  signOut: () => Promise<null>;
}

const AuthConext = createContext<AuthConextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | undefined | null>(undefined);
  //for sign up
  const singUpUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      throw "sign up failed" + error;
    }
    return data;
  };
  //for signIn
  const signInUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      throw "sign in failed" + error;
    }
    return data;
  };

  //for sign out
  const signOut = async (): Promise<null> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw "sign out failed" + error;
    }
    setSession(null);
    return null;
  };

  useEffect(() => {
    //get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    //listen for auth changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthConext.Provider
      value={{
        session: session,
        signInUser,
        singUpUser,
        signOut,
      }}
    >
      {children}
    </AuthConext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthConext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
