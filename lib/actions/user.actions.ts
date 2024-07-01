"use server";

import { cookies } from "next/headers";
import { SignUpParams, signInProps } from "../../types";
import { createAdminClient, createSessionClient } from "../appwrite";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { cookieSessionName } from "../../constants";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const response = await account.createEmailPasswordSession(email, password);
    return parseStringify(response);
  } catch (error) {
    console.error("Error Signing In", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const { email, password, firstName, lastName } = userData;
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(cookieSessionName, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Error Signing In", error);
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    console.error("Error Getting Logged In User", error);
  }
};

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete(cookieSessionName);
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error Logging Out", error);
  }
};
