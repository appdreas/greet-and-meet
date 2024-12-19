"use server";

import { createSessionClient, SESSION_COOKIE } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function deleteActivity(activityId: string) {
  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session) {
    return {
      success: false,
      error: "Could not find session",
    };
  }
  try {
    const { databases } = await createSessionClient(session.value);

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      activityId
    );

    //TODO
    revalidatePath("/activities/user", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to delete activity",
    };
  }
}

export default deleteActivity;
