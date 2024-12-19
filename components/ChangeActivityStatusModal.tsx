import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Status } from "@/config/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ChangeActivityStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (status: Status) => void;
  defaultStatus: Status;
}

export default function ChangeActivityStatusModal({
  isOpen,
  onClose,
  onSubmit,
  defaultStatus,
}: ChangeActivityStatusModalProps) {
  const [status, setStatus] = useState<string>(defaultStatus);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(status as Status);
    setStatus(status);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-72">
        <DialogHeader>
          <DialogTitle>Change status</DialogTitle>
          <DialogDescription>Change attendee status</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="items-center gap-4">
            <Select name="status" value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Accepted">Accepted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
