"use server";

import { createAdminClient } from "@/config/appwrite";
//import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";
import checkAuthentication from "./auth/checkAuthentication";
import { revalidatePath } from "next/cache";

async function addActivityAttendee(activityId: string, message: string) {
  try {
    const { user } = await checkAuthentication();

    if (!user) {
      return {
        isAuthenticated: false,
        error: "You need to be signed in",
      };
    }

    const { databases } = await createAdminClient();

    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ATTENDEES!,
      ID.unique(),
      {
        user_id: user.id,
        status: "Pending",
        message,
        activityId,
      }
    );

    revalidatePath(`/activities/${activityId}`, "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update activity",
    };
  }
}

export default addActivityAttendee;
