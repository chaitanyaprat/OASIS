import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/login-input";
import { Label } from "@/components/ui/login-label";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/auth";
import { LogInSpinner } from "../spinners/page-load";

interface SignUpUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

export function SignInorUp() {
  const [isSignIn, switchSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [signUpFailed, onsignUpFailed] = useState(false);
  const [signInFailed, onsignInFailed] = useState(false);
  const authConext = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (signUpData: SignUpUserData) => {
    try {
      setLoading(true);
      const signUpResponse = await authConext.singUpUser(
        signUpData.email,
        signUpData.password
      );
      if (signUpResponse) {
        onsignUpFailed(false);
        navigate("/home");
      }
    } catch {
      onsignUpFailed(true);
      setLoading(false);
    }
  };

  const handlSignIn = async (signInData: SignInData) => {
    try {
      setLoading(true);
      const signedIn = await authConext.signInUser(
        signInData.email,
        signInData.password
      );
      if (signedIn) {
        onsignInFailed(false);
        navigate("/home");
      }
    } catch {
      onsignInFailed(true);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 1,
            type: "spring",
            stiffness: 500,
            damping: 20,
          },
        }}
        exit={{ x: 1000 }}
        className=" w-md bg-amber-50 md:rounded-2xl rounded-none "
      >
        <Card className="w-full h-full shadow mx-auto   rounded-none  p-4 md:rounded-2xl md:p-8 ">
          {loading && (
            <div className="w-full aspect-square flex items-center justify-center ">
              <LogInSpinner />
            </div>
          )}
          {!loading && (
            <>
              <CardHeader className=" px-0">
                <CardTitle>
                  {isSignIn
                    ? "Login to your account"
                    : "Sign up to get started"}
                </CardTitle>
                <CardDescription>
                  {isSignIn
                    ? "Enter your email below to login to your account"
                    : "Please fill the following details to create account"}
                </CardDescription>
                <CardAction>
                  <Button
                    variant="link"
                    onClick={() => {
                      switchSignIn((curr) => !curr);
                    }}
                  >
                    {isSignIn ? "Sign Up" : "Sign In"}
                  </Button>
                </CardAction>
              </CardHeader>
              {isSignIn ? (
                <SignInForm
                  signInFailed={signInFailed}
                  triggerSignIn={handlSignIn}
                />
              ) : (
                <SignUpForm
                  triggerSignUp={handleSignUp}
                  signUpFailed={signUpFailed}
                />
              )}
            </>
          )}
        </Card>
      </motion.div>
    </div>
  );
}

const SignInForm = ({
  signInFailed,
  triggerSignIn,
}: {
  signInFailed: boolean;
  triggerSignIn: (userData: SignInData) => void;
}) => {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!e.currentTarget.checkValidity()) {
            e.currentTarget.reportValidity();
          } else {
            triggerSignIn({ email, password });
          }
        }}
        className="my-8"
      >
        <div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              required
              onChange={(e) => {
                onEmailChange(e.target.value);
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              required
              onChange={(e) => {
                onPasswordChange(e.target.value);
              }}
            />
          </LabelInputContainer>
        </div>
        <button
          className="flex-1/2 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign in &rarr;
          <BottomGradient />
        </button>
        {signInFailed && (
          <p className="text-red-500">sign in failed, try again</p>
        )}
      </form>
    </>
  );
};
const SignUpForm = ({
  signUpFailed,
  triggerSignUp,
}: {
  signUpFailed: boolean;
  triggerSignUp: (userData: SignUpUserData) => void;
}) => {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [firstName, onFirstNameChange] = useState("");
  const [lastName, onLastnameChange] = useState("");
  const [confirmPassWord, onReEnterPassword] = useState("");

  const passwordsMatch = password === confirmPassWord;

  return (
    <>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!e.currentTarget.checkValidity() && !passwordsMatch) {
            e.currentTarget.reportValidity();
          } else {
            triggerSignUp({ firstName, lastName, email, password });
          }
        }}
        className="my-8"
      >
        <div>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                required
                value={firstName}
                onChange={(e) => {
                  onFirstNameChange(e.target.value);
                }}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                value={lastName}
                required
                onChange={(e) => {
                  onLastnameChange(e.target.value);
                }}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
              required
              onChange={(e) => {
                onEmailChange(e.target.value);
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              required
              onChange={(e) => {
                onPasswordChange(e.target.value);
              }}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="password">Re-enter</Label>
            <Input
              id="reEnterPassword"
              placeholder="••••••••"
              type="password"
              required
              value={confirmPassWord}
              onChange={(e) => {
                onReEnterPassword(e.target.value);
              }}
            />
          </LabelInputContainer>
        </div>
        {!passwordsMatch && (
          <div>
            <p className="text-destructive">
              the password you entered dont match
            </p>
          </div>
        )}
        <button
          className="flex-1/2 group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
        {signUpFailed && (
          <p className="text-red-500">sign up failed, try again</p>
        )}
      </form>
    </>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
