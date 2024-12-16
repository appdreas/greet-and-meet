"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { DatePickerWithRange } from "./DatePickerWithRange";
import ActivityCard from "./ActivityCard";

import { Activity } from "@/config/types";
import { DateRange } from "react-day-picker";

interface Filters {
  type: string;
  dateRange: DateRange;
  maxDistance: number;
}

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    dateRange: { from: undefined, to: undefined },
    maxDistance: 100,
  });

  const handleFilterChange = (
    filterType: keyof Filters,
    value: string | number | DateRange | undefined
  ) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Upcoming Activities
      </h2>

      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <Label htmlFor="type">Activity Type</Label>
            <Select
              onValueChange={(value) => handleFilterChange("type", value)}
              value={filters.type}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Arts">Arts</SelectItem>
                <SelectItem value="Music">Music</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-auto">
            <Label>Date Range</Label>
            <DatePickerWithRange
              date={filters.dateRange}
              setDate={(range) => handleFilterChange("dateRange", range)}
            />
          </div>
          <div className="w-full sm:w-auto">
            <Label>Max Distance: {filters.maxDistance} km</Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[filters.maxDistance]}
              onValueChange={(value) =>
                handleFilterChange("maxDistance", value[0])
              }
            />
          </div>
          <div className="w-full sm:w-auto">
            <Button>Apply Filters</Button>
          </div>
        </div>
      </div>

      {!activities ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div key={activity.$id}>
              <ActivityCard key={activity.activity_id} activity={activity} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
