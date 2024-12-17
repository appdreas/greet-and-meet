"use server";
import { createSessionClient, SESSION_COOKIE } from "@/config/appwrite";
import { cookies } from "next/headers";

async function deleteSession() {
  const session = (await cookies()).get(SESSION_COOKIE);

  if (!session) {
    return {
      success: false,
      error: "Could not find session",
    };
  }
  try {
    const { account } = await createSessionClient(session.value);
    await account.deleteSession("current");

    (await cookies()).delete(SESSION_COOKIE);

    return {
      success: true,
    };
  } catch (error) {
    console.log("Error deleting session", error);
    return {
      success: false,
      error: "Error deleting session",
    };
  }
}

export default deleteSession;
