'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  trigger: React.ReactElement; 
}

export const ConfirmDialog = React.forwardRef<HTMLElement, ConfirmDialogProps>(
  ({ title, description, onConfirm, trigger }, ref) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {React.cloneElement(trigger, { ref })}
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                onConfirm();
              }}
            >
              Да, удалить
            </Button>
            <DialogClose asChild>
              <Button>Отмена</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
ConfirmDialog.displayName = 'ConfirmDialog';
