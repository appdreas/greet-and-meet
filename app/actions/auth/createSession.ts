"use server";
import { createAdminClient, SESSION_COOKIE } from "@/config/appwrite";
import { cookies } from "next/headers";
import checkAuthentication from "./checkAuthentication";

async function createSession(previousState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      error: "Please fill in all fields",
      fieldData: {
        email,
        password,
      },
    };
  }

  const { account } = await createAdminClient();

  try {
    const session = account.createEmailPasswordSession(email, password);

    (await cookies()).set(SESSION_COOKIE, (await session).secret, {
      secure: true,
      sameSite: "strict",
      expires: new Date((await session).expire),
      path: "/",
    });
    const { user } = await checkAuthentication();
    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log("auth error", error);
    return {
      success: false,
      error: "Email and password does not match",
      fieldData: {
        email,
        password,
      },
    };
  }
}

export default createSession;
