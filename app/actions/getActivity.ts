"use server";

import { createAdminClient } from "@/config/appwrite";
import { Activity } from "@/config/types";
import { redirect } from "next/navigation";

async function getActivity(id: string) {
  try {
    const { databases, users } = await createAdminClient();

    const activity: Activity = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      id
    );

    const user = await users.get(activity.user_id);

    const allUsers = await users.list();

    const attendees = activity.attendees.map((attendee) => ({
      ...attendee,
      name: allUsers.users.find((u) => u.$id === attendee.user_id)?.name,
    }));

    return { ...activity, attendees, name: user.name };
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

export default getActivity;
