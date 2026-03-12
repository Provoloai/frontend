import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type DeleteConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  /** e.g. "experience", "project", "education" */
  itemType?: string;
};

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  itemType = "experience",
}: DeleteConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center">
        <DialogHeader className="items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-gray-100">
            <Trash2 size={22} className="text-secondary" />
          </div>
          <DialogTitle className="text-base font-semibold text-dark">
            Are you sure you want to delete this {itemType} from your knowledge
            base?
          </DialogTitle>
          <DialogDescription className="sr-only">
            Confirm deletion
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-3 sm:justify-center mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-lg"
          >
            No, cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 rounded-lg">
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
