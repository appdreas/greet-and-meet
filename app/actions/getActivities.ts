"use server";

import { createAdminClient } from "@/config/appwrite";
import { Activity } from "@/config/types";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

async function getActivities(query: string) {
  try {
    const { databases } = await createAdminClient();

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      [query, Query.orderAsc("activity_date")]
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
