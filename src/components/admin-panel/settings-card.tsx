'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as React from 'react';

export default function SettingsCard() {
  const [form, setForm] = React.useState({
    name: '',
    endpoint: '',
    username: '',
    password: '',
    channel_count: '1',
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/sip', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          endpoint: form.endpoint,
          username: form.username,
          password: form.password,
          channel_count: Number(form.channel_count),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || `Ошибка ${res.status}`);
      // можно очистить форму или показать успех
      setForm({ name: '', endpoint: '', username: '', password: '', channel_count: '1' });
      alert('SIP создан!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-xl border-none">
      <CardHeader>
        <CardTitle>Добавить SIP</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="sip-name">Имя</Label>
            <Input
              id="sip-name"
              value={form.name}
              onChange={handleChange('name')}
              className="w-80 rounded-2xl"
              placeholder="Имя SIP"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="sip-host">Хостинг</Label>
            <Input
              id="sip-host"
              value={form.endpoint}
              onChange={handleChange('endpoint')}
              className="w-80 rounded-2xl"
              placeholder="192.168.0.1"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="sip-username">Логин</Label>
            <Input
              id="sip-username"
              value={form.username}
              onChange={handleChange('username')}
              className="w-80 rounded-2xl"
              placeholder="Номер телефона"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="sip-channels">Количество каналов</Label>
            <Select
              value={form.channel_count}
              onValueChange={v => setForm(f => ({ ...f, channel_count: v }))}
            >
              <SelectTrigger className="w-80 rounded-2xl">
                <SelectValue placeholder="Выберите" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Каналы</SelectLabel>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i + 1} value={`${i + 1}`}>
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="sip-password">Пароль</Label>
            <Input
              id="sip-password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              className="w-80 rounded-2xl"
              placeholder="Введите пароль"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button
              className="w-24 rounded-2xl bg-[#2563EB] hover:bg-[#1E40AF]"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? '...' : 'Применить'}
            </Button>
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </CardContent>
    </Card>
  );
}
