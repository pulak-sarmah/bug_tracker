"use client";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Button, Separator, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SignIn {
  email: string;
  password: string;
}

const SignInCard = ({
  setRegistered,
}: {
  setRegistered: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignIn>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data: SignIn) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!response?.ok) {
        throw new Error();
      }
      router.push("/");
      reset();
      toast.error("Login successfull");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  });

  const googleLogin = async () => {
    try {
      const response = await signIn("google", {
        callbackUrl: `${window.location.origin}/`,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <TextField.Input
            size="3"
            id="email"
            type="email"
            {...register("email", {
              required: "this filed is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
          </div>
          <TextField.Input
            {...register("password", {
              required: "Password is required",
              min: 6,
            })}
            size="3"
            {...register("password", {
              required: "this filed is required",
              minLength: {
                value: 8,
                message: "password must be at least 8 character long",
              },
            })}
          />
          {errors.password && (
            <p className=" text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
        <Button
          disabled={loading}
          className="w-full"
          variant="solid"
          size={"3"}
          type="submit"
        >
          Sign in
        </Button>
        <p>Dont have an account?</p>
        <Button
          className="w-full"
          size={"3"}
          onClick={() => setRegistered(true)}
          variant="soft"
        >
          Register
        </Button>
        <Separator orientation="horizontal" size="4" />
        <Button
          className="w-full"
          color="orange"
          size={"3"}
          onClick={googleLogin}
        >
          Sign in with Google
        </Button>
      </CardContent>
    </form>
  );
};

export default SignInCard;
