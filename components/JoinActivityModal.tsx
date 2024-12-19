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
import { Input } from "@/components/ui/input";

interface JoinActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

export default function JoinActivityModal({
  isOpen,
  onClose,
  onSubmit,
}: JoinActivityModalProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Greet to Meet</DialogTitle>
          <DialogDescription>
            Send your greetings to the activity organizer with your request to
            meet!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="items-center gap-4">
              <Input
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="I'd love to join because..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send Greeting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
