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

export interface Activity extends Models.Document {
  activity_id: string;
  title: string;
  description: string;
  short_description: string;
  activity_date: Date;
  location: Location;
  type: ActivityType;
  user_id: string;
}

export interface Location extends Models.Document {
  location_id: string;
  latitute: string;
  longitude: string;
  activities: Activity[];
}
