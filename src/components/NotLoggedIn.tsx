"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
const NotLoggedIn = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1>You are not logged In</h1>
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  );
};

export default NotLoggedIn;
