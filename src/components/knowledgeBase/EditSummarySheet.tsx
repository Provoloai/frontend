import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  onClose: () => void;
  initialText: string;
  onSave: (text: string) => void | Promise<void>;
};

export default function EditSummarySheet({
  open,
  onClose,
  initialText,
  onSave,
}: Props) {
  const [text, setText] = useState(initialText);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(text);
      onClose();
    } catch (error) {
      // Error is handled by parent, do not close modal
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Edit Professional Summary</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write your professional summary..."
            className="min-h-[200px] resize-none"
          />
        </div>

        <SheetFooter className="flex-row gap-3 border-t pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 flex items-center gap-2" disabled={isSaving}>
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
