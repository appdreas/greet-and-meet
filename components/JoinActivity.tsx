"use client";

import { useState } from "react";
import JoinActivityModal from "./JoinActivityModal";
import { Button } from "./ui/button";
import addActivityAttendee from "@/app/actions/addActivityAttendees";
import { Activity } from "@/config/types";
import { useAuth } from "@/context/authContext";

export default function JoinActivity({ activity }: { activity: Activity }) {
  const { isAuthenticated, user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinRequest = async (message: string) => {
    await addActivityAttendee(activity.$id, message);
    setIsModalOpen(false);
  };

  return (
    isAuthenticated &&
    user?.id !== activity.user_id && (
      <>
        <Button onClick={() => setIsModalOpen(true)}>Greet to Meet</Button>
        <JoinActivityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleJoinRequest}
        />
      </>
    )
  );
}
