"use server";

import { createAdminClient } from "@/config/appwrite";
import { Activity, DateRange } from "@/config/types";
import { revalidatePath } from "next/cache";
//import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Query } from "node-appwrite";

async function getFilteredActivities(
  previousState: unknown,
  formData: FormData,
  dateRange: DateRange | undefined
) {
  try {
    const { databases } = await createAdminClient();

    const type = formData.get("type") as string;

    const fromDate = dateRange?.from?.toISOString() as string;
    const toDate = dateRange?.to?.toISOString() as string;

    const queries = [Query.orderAsc("activity_date")];

    if (type !== "All") {
      queries.push(Query.equal("type", type));
    }

    if (fromDate) {
      queries.push(Query.greaterThanEqual("activity_date", fromDate));
    }
    if (toDate) {
      queries.push(Query.lessThanEqual("activity_date", toDate));
    }

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ACTIVITIES!,
      queries
    );

    const activities = response.documents as Activity[];

    revalidatePath("/activities", "layout");

    return activities;
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}

export default getFilteredActivities;
