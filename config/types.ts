import { type Models } from "appwrite";

type ActivityType =
  | "Sports"
  | "Arts"
  | "Music"
  | "Games"
  | "Walking"
  | "Running"
  | "Cycling"
  | "Gym";

type Status = "Pending" | "Accepted" | "Rejected";

export interface Activity extends Models.Document {
  title: string;
  description: string;
  short_description: string;
  activity_date: string;
  location: Location;
  type: ActivityType;
  user_id: string;
  attendees: Attendee[];
}

export interface Location extends Models.Document {
  latitute: string;
  longitude: string;
  activities: Activity[];
}

export interface Attendee extends Models.Document {
  user_id: string;
  message: string;
  status: Status;
}