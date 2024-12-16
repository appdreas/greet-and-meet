"use server";

import { createAdminClient } from "@/config/appwrite";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getActivities() {
  try {
    const { databases } = await createAdminClient();

    const { documents: activities } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!
    );

    //TODO
    //revalidatePath("/", "layout");

    return activities;
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

export default getActivities;
