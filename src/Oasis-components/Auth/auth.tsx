//create Auth context
//create a wrapper component to provide current session and user data
//create a hook to provide access  to current context

import supabase from "@/supabase-client";
import { Session } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useUserSignIn, useUserSignInOut, useUserSignUp } from "./Api";

interface AuthConextType {
  session: Session | null | undefined;
  signInUser: typeof useUserSignIn;
  singUpUser: typeof useUserSignUp;
  signOut: typeof useUserSignInOut;
}

const AuthConext = createContext<AuthConextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | undefined | null>(undefined);

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
        signInUser: useUserSignIn,
        singUpUser: useUserSignUp,
        signOut: useUserSignInOut,
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
