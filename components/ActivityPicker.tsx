import React from "react";
import { SelectContent, SelectItem } from "./ui/select";
import { activityTypes } from "@/config/types";

const ActivityPicker = () => {
  return (
    <SelectContent>
      <SelectItem value="All">All</SelectItem>
      {activityTypes.map((activityType) => (
        <SelectItem key={activityType} value={activityType}>
          {activityType}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default ActivityPicker;
