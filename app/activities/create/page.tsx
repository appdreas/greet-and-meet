"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import createActivity from "@/app/actions/createActivity";
import SetMarkerOnMap, { MarkerType } from "@/components/SetMarkerOnMap";

export default function CreateActivity() {
  const { toast } = useToast();
  const router = useRouter();
  const [newMarker, setNewMarker] = useState<MarkerType>(null);
  const [state, formAction] = useActionState(
    (state: unknown, formData: FormData) =>
      createActivity(state, formData, newMarker),
    null
  );

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Successfully created new activity!",
      });
      router.push("/activities/user");
    }
  }, [state, toast, router]);

  return (
    <div className="flex items-center justify-center mt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Create New Activity</CardTitle>
          <CardDescription>
            Fill in the details to create a new activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter activity title"
                  name="title"
                  defaultValue={state?.fieldData?.title}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your activity"
                  name="description"
                  defaultValue={state?.fieldData?.description}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Activity Type</Label>
                <Select name="type">
                  <SelectTrigger id="type">
                    <SelectValue
                      placeholder="Select activity type"
                      defaultValue={state?.fieldData?.type}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="datetime">Date</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  name="datetime"
                  defaultValue={state?.fieldData?.datetime}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <SetMarkerOnMap
                  newMarker={newMarker}
                  setNewMarker={setNewMarker}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">
              Create Activity
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
