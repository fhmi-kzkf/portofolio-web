'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function FormDialog({
  open,
  title,
  description,
  submitLabel = 'Simpan item',
  onClose,
  onSubmit,
  children,
}: {
  open: boolean;
  title: string;
  description?: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-h-[88vh] overflow-y-auto border-white-01/15 bg-[#0a0a0a] text-white-01 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white-01">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-white-01/40">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="space-y-4"
        >
          {children}

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white-01/60 hover:bg-white-01/10 hover:text-white-01"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-green-01 font-semibold text-dark-01 hover:bg-green-01/90"
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
