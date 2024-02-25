"use client";

import { Card } from "@radix-ui/themes";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Register from "./Register";
import SignInComp from "./SignIn";

interface SignIn {
  email: string;
  password: string;
}

export default function Component() {
  const [registered, setRegistered] = useState(false);

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        {!registered ? (
          <SignInComp setRegistered={setRegistered} />
        ) : (
          <Register setRegistered={setRegistered} />
        )}
      </Card>
      <Toaster />
    </>
  );
}
