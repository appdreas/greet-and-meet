"use server";

import { createAdminClient } from "@/config/appwrite";
import { Activity } from "@/config/types";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getActivity(id: string) {
  try {
    const { databases } = await createAdminClient();

    const activity: Activity = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      id
    );

    //TODO
    //revalidatePath("/", "layout");

    return activity;
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

export default getActivity;
