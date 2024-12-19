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
import Link from "next/link";

interface Filters {
  type: string;
  dateRange: DateRange;
  maxDistance: number;
}

export default function ActivityList({
  activities,
  showFilter = false,
}: {
  activities: Activity[];
  showFilter?: boolean;
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
    <div className="py-12">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Upcoming Activities
      </h2>
      {showFilter && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="w-full sm:w-auto">
              <Select
                onValueChange={(value) => handleFilterChange("type", value)}
                value={filters.type}
              >
                <SelectTrigger id="type" className="w-[130px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-auto">
              <DatePickerWithRange
                date={filters.dateRange}
                setDate={(range) => handleFilterChange("dateRange", range)}
              />
            </div>
            <div className="w-full sm:w-auto self-start">
              <Label>Max Distance: {filters.maxDistance} km</Label>
              <Slider
                className="w-[140px]"
                min={0}
                max={99}
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
      )}

      {!activities ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Link key={activity.$id} href={`/activities/${activity.$id}`}>
              <ActivityCard key={activity.$id} activity={activity} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
