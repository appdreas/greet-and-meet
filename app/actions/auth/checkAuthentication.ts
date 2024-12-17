"use server";

import { createSessionClient, SESSION_COOKIE } from "@/config/appwrite";
import { User } from "@/config/types";
import { cookies } from "next/headers";

type ReturnType = {
  isAuthenticated: boolean;
  user?: User;
};

async function checkAuthentication(): Promise<ReturnType> {
  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const { account } = await createSessionClient(session.value);
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.log("Failed to get session", error);
    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuthentication;
