"use client";

import { useState } from "react";
import JoinActivityModal from "./JoinActivityModal";
import { Button } from "./ui/button";

export default function JoinActivity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleJoinRequest = (message: string) => {
    console.log(message);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Request to Join</Button>
      <JoinActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleJoinRequest}
      />
    </>
  );
}
