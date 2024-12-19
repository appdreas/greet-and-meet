"use server";

import { createAdminClient } from "@/config/appwrite";
import { Activity, Attendee, Status } from "@/config/types";
import checkAuthentication from "./auth/checkAuthentication";
import { revalidatePath } from "next/cache";

async function updateAttendeeStatus(
  activity: Activity,
  attendee: Attendee,
  status: Status
) {
  try {
    const { user } = await checkAuthentication();

    if (!user) {
      return {
        isAuthenticated: false,
        error: "You need to be signed in",
      };
    }

    const { databases } = await createAdminClient();

    await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ATTENDEES!,
      attendee.$id,
      {
        status,
      }
    );

    revalidatePath(`/activities/${activity.activityId}`, "layout");

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

export default updateAttendeeStatus;
