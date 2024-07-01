"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormInput from "./CustomFormInput";
import { authFormSchema } from "../lib/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "../lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // sign up with appwrite * create Plaid Link Token
      if (type === "sign-up") {
        // sign up
        const newUser = await signUp(data);
        setUser(newUser);
      } else if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col justify-center  gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Next Bank logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-800">
            {user
              ? "Link Bank Account"
              : type === "sign-in"
              ? "Sign In"
              : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your bank account to get started"
              : type === "sign-in"
              ? "Sign in to your account"
              : "Create an account to get started"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid Link*/}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomFormInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="ex. John"
                      type="text"
                    />
                    <CustomFormInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="ex. Doe"
                      type="text"
                    />
                  </div>
                  <CustomFormInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter Address"
                    type="text"
                  />
                  <CustomFormInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="ex. Atlanta"
                    type="text"
                  />
                  <div className="flex gap-4">
                    <CustomFormInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="ex. OH"
                      type="text"
                    />
                    <CustomFormInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex. 55555"
                      type="text"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomFormInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      type="text"
                    />
                    <CustomFormInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="ex. 12345"
                      type="text"
                    />
                  </div>
                </>
              )}
              <CustomFormInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="text"
              />
              <CustomFormInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
