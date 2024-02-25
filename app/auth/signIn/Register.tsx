"use client";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const Register = ({
  setRegistered,
}: {
  setRegistered: (value: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterData>();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data: RegisterData) => {
    try {
      setLoading(true);

      await axios.post("/api/register", data);
      toast("registration successful");
      router.push("/");
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      reset();
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
    } finally {
      setLoading(false);
    }
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Register an account</CardTitle>
        <CardDescription>
          enter your name email and password to register
        </CardDescription>
      </CardHeader>

      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">name</Label>
            <TextField.Input
              size="3"
              id="name"
              placeholder="johnDoe"
              type="text"
              {...register("name", {
                required: "this filed is required",
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <TextField.Input
              size="3"
              id="email"
              placeholder="m@example.com"
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
              size="3"
              id="password"
              type="password"
              placeholder="********"
              {...register("password", {
                required: "this filed is required",
                minLength: {
                  value: 8,
                  message: "password must be at least 8 character long",
                },
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  message:
                    "must contain one uppercase, one lowercase, one digit and one special charecter",
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
            size={"3"}
            variant="surface"
            type="submit"
          >
            Register
          </Button>

          <Button
            className="w-full"
            size={"3"}
            variant="outline"
            onClick={() => setRegistered(false)}
          >
            Back to SignIn
          </Button>
        </CardContent>
      </form>
    </>
  );
};

export default Register;
