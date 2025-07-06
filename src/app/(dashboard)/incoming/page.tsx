'use client';

import * as React from 'react';
import useSWR from 'swr';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { IncomingCards } from '@/components/admin-panel/incoming-cards';
import { DataTable } from '@/components/admin-panel/data-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select';
import { SearchIcon, Play, Pause } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

//
// --- Зод‐схемы
//
interface IncomingCall {
  id: number;
  phone: string;
  client_name: string;
  start_date: string | null;
  recording_url: string | null;
}

const IncomingCallSchema = z.object({
  id: z.number(),
  phone: z.string(),
  client_name: z.string(),
  start_date: z.string().nullable(),
  recording_url: z.string().nullable(),
});

const IncomingPageSchema = z.object({
  calls:    z.array(IncomingCallSchema),
  total:    z.number(),
  page:     z.number(),
  per_page: z.number(),
});

//
// --- Глобальная переменная для одного активного <audio>
//
let _currentAudio: HTMLAudioElement | null = null;

//
// --- Компонент плеера
//
function AudioPlayer({ src }: { src: string }) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const waveRef  = React.useRef<HTMLDivElement>(null);

  const [playing,     setPlaying]     = React.useState(false);
  const [progress,    setProgress]    = React.useState(0);   // 0–100%
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration,    setDuration]    = React.useState(0);

  // 30 случайных столбиков
  const bars = React.useMemo(
    () => Array.from({ length: 30 }, () => 20 + Math.random() * 60),
    [src]
  );

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onMeta  = () => setDuration(audio.duration || 0);
    const onTime  = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    const onEnd   = () => setPlaying(false);

    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('timeupdate',      onTime);
    audio.addEventListener('ended',           onEnd);

    return () => {
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('timeupdate',      onTime);
      audio.removeEventListener('ended',           onEnd);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playing) {
      // ставим на паузу предыдущий, если есть
      if (_currentAudio && _currentAudio !== audio) {
        _currentAudio.pause();
      }
      audio.play();
      _currentAudio = audio;
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
      // если это был текущий – сбросим
      if (_currentAudio === audio) _currentAudio = null;
    }
  };

  // MM:SS
  const fmt = (sec: number) => {
    const m = Math.floor(sec/60).toString().padStart(2,'0');
    const s = Math.floor(sec%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };

  // seek по клику на волну
  const onSeek = (e: React.MouseEvent) => {
    const audio = audioRef.current;
    const wave  = waveRef.current;
    if (!audio || !wave) return;
    const rect = wave.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left)/rect.width));
    audio.currentTime = pct * duration;
  };

  const activeCount = Math.round((progress / 100) * bars.length);

  return (
    <div className="flex items-center gap-2 w-56 text-xs">
      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      {/* Волновая форма */}
      <div
        ref={waveRef}
        onClick={onSeek}
        className="relative flex-1 h-6 flex items-end cursor-pointer"
      >
        {/* фоновые столбики */}
        <div className="absolute inset-0 flex items-end space-x-[1px]">
          {bars.map((h,i) => (
            <div
              key={i}
              className="rounded-sm bg-gray-300"
              style={{ width: 3, height: `${h}%` }}
            />
          ))}
        </div>
        {/* прогресс */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${progress}%`, transition:'width 150ms linear' }}
        >
          <div className="flex items-end space-x-[1px]">
            {bars.map((h,i) => (
              <div
                key={i}
                className="rounded-sm bg-blue-500"
                style={{ width: 3, height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Время */}
      <span className="w-10 text-left">{fmt(duration)}</span>

      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
    </div>
  );
}

//
// --- Колонки
//
const columns: ColumnDef<IncomingCall>[] = [
  { accessorKey: 'id',          header: 'ID' },
  { accessorKey: 'phone',       header: 'Телефон' },
  { accessorKey: 'client_name', header: 'Клиент' },
  {
    accessorKey: 'start_date',
    header: 'Дата',
    cell: info =>
      info.getValue()
        ? new Date(info.getValue() as string).toLocaleString()
        : '—',
  },
  {
    accessorKey: 'recording_url',
    header: 'Запись',
    cell: info => {
      const url = info.getValue() as string | null;
      return url ? <AudioPlayer src={url} /> : '—';
    },
  },
];

//
// --- Fetcher & Page
//
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    headers:     { Accept: 'application/json' },
    cache:       'no-store',
  });
  if (!res.ok) throw new Error(`Ошибка ${res.status}`);
  return IncomingPageSchema.parse(await res.json());
};

export default function SettingsPage() {
  const { data, error, isLoading } = useSWR(
    '/api/calls/incoming?page=1&per_page=10',
    fetcher,
    { revalidateOnFocus:true, revalidateOnMount:true, dedupingInterval:0 }
  );

  const calls          = data?.calls ?? [];
  const loadingInitial = isLoading;

  return (
    <ContentLayout title="Статистика входящих звонков">
      <IncomingCards />

      <div className="flex items-center gap-4 mt-6 mb-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
          <Input placeholder="Поиск по телефону" className="pl-10 w-60 rounded-2xl"/>
        </div>
        <Select>
          <SelectTrigger className="w-48 rounded-2xl">
            <SelectValue placeholder="Статус"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Статусы</SelectLabel>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="answered">Отвеченные</SelectItem>
              <SelectItem value="missed">Пропущенные</SelectItem>
              <SelectItem value="pending">В ожидании</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DataTable<IncomingCall, typeof IncomingCallSchema>
        data={calls}
        columns={columns}
        schema={IncomingCallSchema}
        getRowId={r => r.id.toString()}
        loading={loadingInitial}
      />

      {error && (
        <div className="text-red-600 text-sm mt-2">{error.message}</div>
      )}
    </ContentLayout>
  );
}
