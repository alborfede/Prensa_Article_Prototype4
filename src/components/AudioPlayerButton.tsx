import React, { useState, useEffect, useRef } from 'react';

export const AudioPlayerButton: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'playing' | 'paused'>('idle');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Apuntamos al archivo local ubicado en /public/audio_parte1_articulo.mp3
    audioRef.current = new Audio('/audio_parte1_articulo.mp3');
    const audio = audioRef.current;

    const handleLoadedMetadata = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration)) {
        setTotalDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setStatus('idle');
      setCurrentTime(0);
      setProgress(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === 'playing') {
      audio.play().catch((err) => console.error('Error al reproducir audio local:', err));
    } else if (status === 'paused') {
      audio.pause();
    } else if (status === 'idle') {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [status]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    if (status === 'idle') setStatus('playing');
    else if (status === 'playing') setStatus('paused');
    else if (status === 'paused') setStatus('playing');
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStatus('idle');
    setProgress(0);
    setCurrentTime(0);
  };

  return (
    <div className="audio-wrapper">
      {status === 'idle' && (
        <button className="summarize-btn" onClick={handleTogglePlay}>
          <svg className="summarize-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M11 5L6 9H2V15H6L11 19V5Z"
              stroke="#3c4043"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53"
              stroke="#3c4043"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07"
              stroke="#3c4043"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>Escuchar nota</span>
        </button>
      )}

      {status === 'playing' && (
        <div className="summarize-loading-container audio-active-container">
          <div
            className="summarize-btn loading audio-playing"
            onClick={handleTogglePlay}
          >
            <div className="audio-info-group">
              <svg
                className="summarize-icon sound-wave-active"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  className="wave-bar bar-1"
                  d="M6 10V14"
                  stroke="#e64a19"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="wave-bar bar-2"
                  d="M10 6V18"
                  stroke="#e64a19"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="wave-bar bar-3"
                  d="M14 8V16"
                  stroke="#e64a19"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  className="wave-bar bar-4"
                  d="M18 11V13"
                  stroke="#e64a19"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <span>Escuchando...</span>
              <span className="audio-time-badge">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>

            <button className="audio-control-btn" title="Pausar">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="#3c4043">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            </button>

            <div className="audio-progress-bar-bg">
              <div
                className="audio-progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {status === 'paused' && (
        <div className="audio-paused-container">
          <button className="summarize-btn" onClick={handleTogglePlay}>
            <svg className="summarize-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M8 5V19L19 12L8 5Z"
                stroke="#3c4043"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Continuar ({formatTime(currentTime)})</span>
          </button>

          <button
            className="audio-stop-btn"
            onClick={handleStop}
            title="Cerrar reproductor"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="#5f6368"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};