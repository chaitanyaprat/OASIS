import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/login-label";
import { Input } from "@/components/ui/login-input";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../Auth/auth";
import { useNavigate } from "react-router-dom";

export function SignInorUp() {
  const [isSignIn, switchSignIn] = useState(true);

  return (
    <Card className="w-full shadow mx-auto w-full max-w-md rounded-none  p-4 md:rounded-2xl md:p-8 ">
      <CardHeader className="my- px-0">
        <CardTitle>
          {isSignIn ? "Login to your account" : "Sign up to get started"}
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
      {isSignIn ? <SignInForm /> : <SignUpForm />}
    </Card>
  );
}

const SignInForm = () => {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [signInFailed, onsignInFailed] = useState(false);
  const authConext = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
    } else {
      try {
        const signedIn = await authConext.signInUser(email, password);
        if (signedIn) {
          onsignInFailed(false);
          navigate("/home");
        }
      } catch {
        onsignInFailed(true);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
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
const SignUpForm = () => {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [firstName, onFirstNameChange] = useState("");
  const [lastName, onLastnameChange] = useState("");
  const [confirmPassWord, onReEnterPassword] = useState("");
  const [signUpFailed, onsignUpFailed] = useState(false);

  const authConext = useAuth();

  const navigate = useNavigate();
  const passwordsMatch = password === confirmPassWord;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity() && !passwordsMatch) {
      e.currentTarget.reportValidity();
    } else {
      const signUpData = await authConext.singUpUser(email, password);
      try {
        if (signUpData?.user) {
          onsignUpFailed(false);
          navigate("/home");
        }
      } catch {
        onsignUpFailed(true);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="my-8">
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
          <p className="text-red-500">sign in failed, try again</p>
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
