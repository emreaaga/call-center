'use client';

import * as React from 'react';
import useSWR, { useSWRConfig } from 'swr';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface EditSipDialogProps {
  sipUuid: string;
  trigger: React.ReactElement;
}

interface EditSipForm {
  name: string;
  endpoint: string;
  channel_count: number;
  status_ru: string;
}

async function fetchSip([, uuid]: [string, string]) {
  const res = await fetch('/api/sip/get-sip', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uuid }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);
  return res.json();
}

export const EditSipDialog = React.forwardRef<HTMLElement, EditSipDialogProps>(
  ({ sipUuid, trigger }, ref) => {
    const [open, setOpen] = React.useState(false);
    const { mutate } = useSWRConfig();

    const { data, error, isLoading } = useSWR(
      open ? ['edit-sip', sipUuid] : null,
      fetchSip
    );

    const [form, setForm] = React.useState<EditSipForm | null>(null);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
      if (data) {
        setForm({
          name: data.name,
          endpoint: data.endpoint,
          channel_count: data.channel_count,
          status_ru: data.status_ru,
        });
      }
    }, [data]);

    const onChange = (field: keyof EditSipForm) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!form) return;
      const value =
        field === 'channel_count'
          ? Number(e.target.value)
          : e.target.value;
      setForm({ ...form, [field]: value });
    };

    const handleSave = () => {
      if (!form) return;
      setSaving(true);

      const savePromise = (async () => {
        const res = await fetch('/api/sip/update-sip', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uuid: sipUuid, ...form }),
        });
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        await mutate('/api/dashboard/get-sip');
        await mutate(['edit-sip', sipUuid]);
        setOpen(false);
      })();

      toast.promise(savePromise, {
        loading: 'Сохраняем SIP…',
        success: 'SIP был успешно сохранён!',
        error: (err: Error) => `Ошибка: ${err.message}`,
      });

      savePromise.finally(() => setSaving(false));
    };


    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {React.cloneElement(trigger, { ref })}
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Редактировать SIP</DialogTitle>
            <DialogDescription>
              {isLoading
                ? 'Загрузка…'
                : error
                  ? `Ошибка: ${error.message}`
                  : 'Измените поля и нажмите «Сохранить»'}
            </DialogDescription>
          </DialogHeader>

          {form && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Имя</Label>
                <Input value={form.name} onChange={onChange('name')} />
              </div>
              <div>
                <Label>Endpoint</Label>
                <Input value={form.endpoint} onChange={onChange('endpoint')} />
              </div>
              <div>
                <Label>Каналов</Label>
                <Input
                  type="number"
                  value={String(form.channel_count)}
                  onChange={onChange('channel_count')}
                />
              </div>
              <div className="col-span-2">
                <Label>Статус</Label>
                <Input value={form.status_ru} onChange={onChange('status_ru')} />
              </div>
            </div>
          )}

          <DialogFooter className="mt-6 space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Сохраняем…' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
EditSipDialog.displayName = 'EditSipDialog';
