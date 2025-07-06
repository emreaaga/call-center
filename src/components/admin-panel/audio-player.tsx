'use client';

import * as React from 'react';
import { Pause, Play } from 'lucide-react';

interface AudioPlayerProps {
    src: string;
}

function AudioPlayer({ src }: AudioPlayerProps) {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const waveRef = React.useRef<HTMLDivElement>(null);
    const idRef = React.useRef(Math.random().toString(36).slice(2));
    const [playing, setPlaying] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isHovered, setIsHovered] = React.useState(false);
    const [hoverTime, setHoverTime] = React.useState<number | null>(null);

    // Generate waveform bars
    const bars = React.useMemo(
        () => Array.from({ length: 40 }, () => 20 + Math.random() * 60),
        [src]
    );

    // Handle audio events
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onMeta = () => setDuration(audio.duration || 0);
        const onTime = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };
        const onEnded = () => setPlaying(false);
        const onError = () => console.error('Audio loading failed');

        audio.addEventListener('loadedmetadata', onMeta);
        audio.addEventListener('timeupdate', onTime);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('error', onError);

        return () => {
            audio.removeEventListener('loadedmetadata', onMeta);
            audio.removeEventListener('timeupdate', onTime);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('error', onError);
        };
    }, []);

    // Global audio control
    React.useEffect(() => {
        const handler = (e: Event) => {
            const ev = e as CustomEvent<string>;
            if (ev.detail !== idRef.current && playing) {
                const audio = audioRef.current;
                audio?.pause();
                setPlaying(false);
            }
        };
        window.addEventListener('audioplayer-play', handler);
        return () => {
            window.removeEventListener('audioplayer-play', handler);
        };
    }, [playing]);

    // Format time as MM:SS
    const fmt = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Toggle play/pause
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!playing) {
            window.dispatchEvent(
                new CustomEvent('audioplayer-play', { detail: idRef.current })
            );
            audio.play().catch(() => console.error('Playback failed'));
            setPlaying(true);
        } else {
            audio.pause();
            setPlaying(false);
        }
    };

    // Seek to position
    const onSeek = (e: React.MouseEvent) => {
        const audio = audioRef.current;
        const wave = waveRef.current;
        if (!audio || !wave || duration === 0) return;
        const rect = wave.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        audio.currentTime = pct * duration;
        setProgress(pct * 100);
        setCurrentTime(audio.currentTime);
    };

    // Handle waveform hover for tooltip
    const onWaveHover = (e: React.MouseEvent) => {
        const wave = waveRef.current;
        if (!wave || duration === 0) return;
        const rect = wave.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        setHoverTime(pct * duration);
    };

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ') {
            e.preventDefault();
            togglePlay();
        } else if (e.key === 'ArrowLeft' && audioRef.current) {
            audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / duration) * 100);
        } else if (e.key === 'ArrowRight' && audioRef.current) {
            audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5);
            setCurrentTime(audioRef.current.currentTime);
            setProgress((audioRef.current.currentTime / duration) * 100);
        }
    };

    return (
        <div
            className="flex items-center gap-2 w-64  rounded-lg text-[10px] font-medium text-gray-800"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Audio player"
        >
            {/* Play/Pause Button */}
            <button
                onClick={togglePlay}
                className="p-1.5 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={playing ? 'Pause audio' : 'Play audio'}
            >
                {playing ? (
                    <Pause className="w-4 h-4" />
                ) : (
                    <Play className="w-4 h-4" />
                )}
            </button>

            {/* Current Time */}
            <span className="w-10 text-right">{fmt(currentTime)}</span>

            {/* Waveform */}
            <div
                ref={waveRef}
                onClick={onSeek}
                onMouseMove={onWaveHover}
                className="relative flex-1 h-8 flex items-end cursor-pointer transition-all duration-200"
            >
                {/* Background Bars */}
                <div className="absolute inset-0 flex items-end space-x-[1px]">
                    {bars.map((h, i) => (
                        <div
                            key={i}
                            className="rounded-sm bg-gray-200 transition-all duration-200"
                            style={{
                                width: 2,
                                height: `${h}%`,
                                transform: isHovered ? 'scaleY(1.15)' : 'scaleY(1)',
                                transformOrigin: 'bottom',
                                transitionDelay: `${i * 2}ms`,
                            }}
                        />
                    ))}
                </div>

                {/* Progress Bars with Gradient */}
                <div
                    className="absolute inset-y-0 left-0 overflow-hidden"
                    style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
                >
                    <div className="flex items-end space-x-[1px]">
                        {bars.map((h, i) => (
                            <div
                                key={i}
                                className="rounded-sm bg-gradient-to-t from-blue-400 via-blue-500 to-blue-600 transition-all duration-200"
                                style={{
                                    width: 2,
                                    height: `${h}%`,
                                    transform: isHovered ? 'scaleY(1.15)' : 'scaleY(1)',
                                    transformOrigin: 'bottom',
                                    transitionDelay: `${i * 2}ms`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Cursor with Animation */}
                <div
                    className="absolute top-0 bottom-0 w-[2px] bg-blue-700 pointer-events-none"
                    style={{
                        left: `${progress}%`,
                        transition: 'left 100ms linear',
                        boxShadow: playing ? '0 0 8px rgba(59, 130, 246, 0.5)' : 'none',
                        animation: playing ? 'pulse 1.5s infinite' : 'none',
                    }}
                />

                {/* Hover Tooltip */}
                {isHovered && hoverTime !== null && (
                    <div
                        className="absolute -top-6 bg-gray-800 text-white text-[10px] rounded px-1.5 py-0.5"
                        style={{
                            left: `${(hoverTime / duration) * 100}%`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {fmt(hoverTime)}
                    </div>
                )}
            </div>

            {/* Duration */}
            <span className="w-10 text-left">{fmt(duration)}</span>

            {/* Hidden Audio Element */}
            <audio ref={audioRef} src={src} preload="metadata" className="hidden" />
        </div>
    );
}

export default AudioPlayer;