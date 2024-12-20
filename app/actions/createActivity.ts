"use server";

import { MarkerType } from "@/components/SetMarkerOnMap";
import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { ID } from "node-appwrite";
import checkAuthentication from "./auth/checkAuthentication";

async function createActivity(
  previousState: unknown,
  formData: FormData,
  newMarker: MarkerType
) {
  const { databases } = await createAdminClient();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const datetime = formData.get("datetime") as string;
  const location = formData.get("location") as string;

  try {
    const { user } = await checkAuthentication();

    if (!user) {
      return {
        isAuthenticated: false,
        error: "You need to be signed in",
        fieldData: {
          title,
          description,
          type,
          datetime,
        },
      };
    }

    const newActivity = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      ID.unique(),
      {
        user_id: user.id,
        title,
        description,
        type,
        activity_date: datetime,
        location: newMarker != null && {
          latitude: newMarker?.latitude,
          longitude: newMarker?.longitude,
        },
      }
    );
    revalidatePath("/", "layout");
    revalidatePath("/activities", "layout");
    return {
      success: true,
      newActivity,
    };
  } catch (error) {
    console.log("Failed to create activity", error);
    return {
      success: false,
      error: "Failed to create activity",
      fieldData: {
        title,
        description,
        type,
        datetime,
        location,
      },
    };
  }
}

export default createActivity;
