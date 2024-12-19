import { type Models } from "appwrite";

export const activityTypes = [
  "Sports",
  "Arts",
  "Music",
  "Games",
  "Walking",
  "Running",
  "Cycling",
  "Gym",
] as const;

export type ActivityType = (typeof activityTypes)[number];

export type Status = "Pending" | "Accepted" | "Rejected";

export interface Activity extends Models.Document {
  title: string;
  description: string;
  activity_date: string;
  location: Location;
  type: ActivityType;
  user_id: string;
  attendees: Attendee[];
}

export interface Location extends Models.Document {
  latitute: number;
  longitude: number;
  activity: Activity;
}

export interface Attendee extends Models.Document {
  user_id: string;
  message: string;
  status: Status;
  activityId: Activity;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
