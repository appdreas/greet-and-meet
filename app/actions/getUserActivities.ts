"use server";

import { createSessionClient, SESSION_COOKIE } from "@/config/appwrite";
import { Activity } from "@/config/types";
import { cookies } from "next/headers";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

async function getUserActivities() {
  const session = (await cookies()).get(SESSION_COOKIE);
  if (!session) {
    return [];
  }
  try {
    const { account, databases } = await createSessionClient(session.value);

    const user = await account.get();
    const userId = user.$id;

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      [Query.equal("user_id", userId), Query.orderAsc("activity_date")]
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

export default getUserActivities;
