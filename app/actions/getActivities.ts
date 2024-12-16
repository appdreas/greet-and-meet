"use server";

import { createAdminClient } from "@/config/appwrite";
import { Activity } from "@/config/types";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getActivities() {
  try {
    const { databases } = await createAdminClient();

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!
    );

    const activities = response.documents as Activity[];

    //TODO
    //revalidatePath("/", "layout");

    return activities;
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

export default getActivities;
