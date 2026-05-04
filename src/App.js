import React, { useState, useEffect } from 'react';

function App() {
  const TOTAL_SECONDS = 25200; // 7 hours
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h: String(h).padStart(2, '0'), m: String(m).padStart(2, '0'), s: String(s).padStart(2, '0') };
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const isTimeUp = timeLeft === 0;
  const time = formatTime(timeLeft);

  return (
    <div 
      className="min-h-screen bg-black flex items-center justify-center p-16"
    >
      {/* Glassmorphism Card on Right Side */}
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-md rounded-[3rem] p-16 shadow-2xl border border-white/10">
        {isTimeUp ? (
          <div className="text-center py-12">
            <div className="text-8xl mb-8">🎉</div>
            <h2 className="text-6xl font-bold text-white mb-4">Time's Up!</h2>
            <p className="text-xl text-white/80">Amazing work, hackers!</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-20 mx-auto mb-6 opacity-90"
                onError={(e) => e.target.style.display = 'none'}
              />
              <h1 className="text-4xl font-bold text-white leading-tight mb-2">
                Push Pull Commit
              </h1>
              <p className="text-lg text-white/70">Hackathon</p>
            </div>

            {/* Timer Cards */}
            <div className="flex items-end justify-center gap-8 mb-10">
              {/* Hours */}
              <div className="text-center">
                <div className="bg-white/15 backdrop-blur-sm rounded-3xl px-16 py-12 shadow-xl border border-white/20 mb-4">
                  <div className="text-9xl font-bold text-white tabular-nums">
                    {time.h}
                  </div>
                </div>
                <p className="text-lg text-white/70 tracking-[0.2em] uppercase font-light">Hours</p>
              </div>

              {/* Minutes */}
              <div className="text-center">
                <div className="bg-white/15 backdrop-blur-sm rounded-3xl px-16 py-12 shadow-xl border border-white/20 mb-4">
                  <div className="text-9xl font-bold text-white tabular-nums">
                    {time.m}
                  </div>
                </div>
                <p className="text-lg text-white/70 tracking-[0.2em] uppercase font-light">Minutes</p>
              </div>

              {/* Seconds */}
              <div className="text-center">
                <div className="bg-white/15 backdrop-blur-sm rounded-3xl px-16 py-12 shadow-xl border border-white/20 mb-4">
                  <div className="text-9xl font-bold text-white tabular-nums">
                    {time.s}
                  </div>
                </div>
                <p className="text-lg text-white/70 tracking-[0.2em] uppercase font-light">Seconds</p>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium tracking-wide transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl border border-white/20 disabled:hover:bg-white/10"
              >
                Start
              </button>
              <button
                onClick={handlePause}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
              >
                Pause
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20"
              >
                Reset
              </button>
            </div>

            {/* Fullscreen Button */}
            <div className="flex items-center justify-center mb-4">
              <button
                onClick={toggleFullscreen}
                className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm rounded-lg font-medium tracking-wide transition-all duration-300 border border-white/10"
              >
                {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-xs text-white/50">
                Organized by <span className="font-semibold text-white/70">IEEE Computer Society</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
