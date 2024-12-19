"use client";

import { Activity } from "@/config/types";
import { Button } from "./ui/button";
import deleteActivity from "@/app/actions/deleteActivity";
import { toast } from "@/hooks/use-toast";
import { MouseEvent } from "react";

export default function ActionButtons({ activity }: { activity: Activity }) {
  const handleEdit = (e: MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(id);
  };
  const handleDelete = async (e: MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await deleteActivity(id);
      toast({
        title: "Activity was deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete activity", error);
      toast({
        variant: "destructive",
        title: "Failed to delete activity",
      });
    }
  };
  return (
    <div className="flex items-center justify-end space-x-2 p-6 md:w-1/4">
      <Button variant="outline" onClick={(e) => handleEdit(e, activity.id)}>
        Edit
      </Button>
      <Button
        variant="destructive"
        onClick={(e) => handleDelete(e, activity.$id)}
      >
        Delete
      </Button>
    </div>
  );
}
