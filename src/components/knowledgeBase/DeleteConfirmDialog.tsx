import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  /** e.g. "experience", "project", "education" */
  itemType?: string;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  itemType = "experience",
}: DeleteConfirmDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (e) {
      // Handled by parent
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center border-[#E5E7EB] border rounded-[0.75rem] p-6">
        <DialogHeader className="items-center gap-3">
          <Trash2 size={48} className="text-[#99A1AF]" />

          <DialogTitle className="text-center font-normal text-base text-secondary pt-3 pb-6">
            Are you sure you want to delete this {itemType} from your knowledge
            base?
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirm deletion
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl py-2.5"
            disabled={isDeleting}
          >
            No, cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1 rounded-xl py-2.5 flex items-center gap-2" disabled={isDeleting}>
            {isDeleting && <Loader2 className="size-4 animate-spin" />}
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
