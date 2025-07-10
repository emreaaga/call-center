'use client';

import * as React from 'react';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';

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

export interface ConfirmDialogProps {
  /** Заголовок модалки */
  title: string;
  /** Описание внутри модалки */
  description: string;
  /** UUID SIP, который нужно удалить */
  sipUuid: string;
  /** Кнопка или иконка-триггер */
  trigger: React.ReactElement;
}

export const ConfirmDialog = React.forwardRef<HTMLElement, ConfirmDialogProps>(
  ({ title, description, sipUuid, trigger }, ref) => {
    const { mutate } = useSWRConfig();
    const [open, setOpen] = React.useState(false);
    const [deleting, setDeleting] = React.useState(false);

    const handleConfirm = () => {
      setOpen(false)
      setDeleting(true);
      const deletePromise = (async () => {
        const res = await fetch('/api/sip/delete', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uuid: sipUuid }),
        });
        if (!res.ok) {
          let errMsg = `Ошибка ${res.status}`;
          try {
            const data = await res.json();
            if (data?.message) errMsg = data.message;
          } catch {
            // не JSON — пропускаем
          }
          throw new Error(errMsg);
        }
        await mutate('/api/dashboard/get-sip');
      })();

      toast.promise(deletePromise, {
        loading: 'Удаляем SIP…',
        success: 'SIP был успешно удалён',
        error:   (err: Error) => `Ошибка: ${err.message}`,
      });

      deletePromise
        .finally(() => setDeleting(false));
    };

    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
              onClick={handleConfirm}
              disabled={deleting}
            >
              {deleting ? 'Удаляем…' : 'Да, удалить'}
            </Button>
            <DialogClose asChild>
              <Button disabled={deleting}>Отмена</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

ConfirmDialog.displayName = 'ConfirmDialog';
