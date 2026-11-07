'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Play, Pause, Maximize, RotateCcw } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  videoSrc: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ isOpen, videoSrc, title, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHoveringControls, setIsHoveringControls] = useState(true);

  // Close and reset video cleanly
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  }, [onClose]);

  // Autoplay muted when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, [isOpen, videoSrc]);

  // Escape key listener & scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPos = (e.clientX - rect.left) / rect.width;
    const newTime = Math.max(0, Math.min(duration, clickPos * duration));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!isOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-5xl bg-[#121613] rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col z-10">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#0B0E0C]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5F36A] animate-pulse" />
            <h3 className="text-xs sm:text-sm font-semibold text-[#F4F5EF] tracking-wide truncate max-w-[280px] sm:max-w-md">
              {title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-[#A5B49F] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div
          className="relative aspect-video w-full bg-black flex items-center justify-center group cursor-pointer"
          onClick={togglePlay}
          onMouseEnter={() => setIsHoveringControls(true)}
          onMouseLeave={() => setIsHoveringControls(false)}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-contain"
          />

          {/* Centered Large Play Overlay when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C5F36A]/90 text-black flex items-center justify-center shadow-2xl pointer-events-none transform transition-transform scale-100 hover:scale-110">
              <Play className="w-8 h-8 fill-black ml-1" />
            </div>
          )}

          {/* Custom Controls Bar (No volume/audio slider, with pause/play, seek, and fullscreen) */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
              isHoveringControls || !isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrubbable Progress Bar */}
            <div
              ref={progressBarRef}
              onClick={handleSeek}
              className="relative w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all mb-3 overflow-hidden"
              role="slider"
              aria-label="Seek video progress"
              aria-valuenow={currentTime}
              aria-valuemin={0}
              aria-valuemax={duration}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#C5F36A] rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between text-xs font-mono text-[#F4F5EF]">
              <div className="flex items-center gap-3">
                {/* Play / Pause Toggle */}
                <button
                  onClick={togglePlay}
                  type="button"
                  className="p-2 rounded-lg bg-white/10 hover:bg-[#C5F36A] hover:text-black transition-colors cursor-pointer"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                {/* Restart */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0;
                      videoRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  type="button"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="Replay from start"
                  aria-label="Replay from start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Time Display */}
                <span className="text-white/80 select-none">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#A5B49F] font-mono mr-1">
                  [MUTED DEMO]
                </span>
                
                {/* Fullscreen Button */}
                <button
                  onClick={handleFullscreen}
                  type="button"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="Fullscreen"
                  aria-label="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
