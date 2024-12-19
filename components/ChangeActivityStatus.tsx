"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Activity, Attendee, Status } from "@/config/types";
import ChangeActivityStatusModal from "./ChangeActivityStatusModal";
import updateAttendeeStatus from "@/app/actions/updateAttendeeStatus";

export default function ChangeActivityStatus({
  activity,
  attendee,
}: {
  activity: Activity;
  attendee: Attendee;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeStatus = async (newStatus: Status) => {
    await updateAttendeeStatus(activity, attendee, newStatus);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        size="sm"
        className={
          attendee.status === "Accepted"
            ? "bg-green-500"
            : attendee.status === "Rejected"
            ? "bg-red-500"
            : "bg-primary"
        }
        onClick={() => setIsModalOpen(true)}
      >
        {attendee.status}
      </Button>
      <ChangeActivityStatusModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={changeStatus}
        defaultStatus={attendee.status}
      />
    </>
  );
}
