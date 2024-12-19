"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
//import { Slider } from "@/components/ui/slider";
import ActivityCard from "./ActivityCard";

import { Activity, DateRange } from "@/config/types";
import Link from "next/link";
import getFilteredActivities from "@/app/actions/getFilteredActivities";
import ActivityPicker from "./ActivityPicker";

export default function ActivityList({
  activities,
  showFilter = false,
}: {
  activities: Activity[];
  showFilter?: boolean;
}) {
  const [dateRange] = useState<DateRange | undefined>(undefined);

  //const [maxDistance, setMaxDistance] = useState(0);
  const [state, formAction] = useActionState(
    (state: unknown, formData: FormData) =>
      getFilteredActivities(state, formData, dateRange),
    activities
  );

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Upcoming Activities
      </h2>
      {showFilter && (
        <form action={formAction}>
          <div className="mb-6 space-y-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="w-full sm:w-auto">
                <Select name="type">
                  <SelectTrigger id="type" className="w-[130px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <ActivityPicker />
                </Select>
              </div>
              {/* <div className="w-full sm:w-auto">
                <DatePickerWithRange
                  date={dateRange}
                  setDate={(range) => setDateRange(range)}
                />
              </div> */}
              {/* <div className="w-full sm:w-auto self-start">
                <Label>Max Distance: {maxDistance} km</Label>
                <Slider
                  className="w-[140px]"
                  min={0}
                  max={99}
                  step={1}
                  name="maxDistance"
                  onValueChange={(value) => setMaxDistance(value[0])}
                />
              </div> */}
              <div className="w-full sm:w-auto">
                <Button type="submit">Apply Filters</Button>
              </div>
            </div>
          </div>
        </form>
      )}

      {!state ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {state.length === 0 && <div>No activities matching the filter</div>}
          {state.map((activity) => (
            <Link key={activity.$id} href={`/activities/${activity.$id}`}>
              <ActivityCard key={activity.$id} activity={activity} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
