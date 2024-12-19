"use server";

import { createSessionClient, SESSION_COOKIE } from "@/config/appwrite";
import { Attendee } from "@/config/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

async function getAttendingActivities() {
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
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ATTENDEES!,
      [Query.equal("user_id", userId)]
    );

    const attending = response.documents as Attendee[];

    const activities = attending.map((attending) => ({
      ...attending.activityId,
      status: attending.status,
    }));

    return activities;
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

export default getAttendingActivities;
