import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<(OscillatorNode | AudioNode)[]>([]);

  const startAtmosphericAudio = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3.5);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // 1. Ethereal Mountain Pentatonic Drone Chords (D, A, E, F#, A)
      const frequencies = [146.83, 220.0, 329.63, 369.99, 440.0];
      const createdNodes: (OscillatorNode | AudioNode)[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Slow pitch drift to mimic mountain breeze and flute harmonics
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        createdNodes.push(lfo, lfoGain);

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((idx - 2) * 0.35, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(panner);
          panner.connect(masterGain);
          createdNodes.push(panner);
        } else {
          osc.connect(oscGain);
          oscGain.connect(masterGain);
        }

        osc.start();
        createdNodes.push(osc, oscGain);
      });

      // 2. Wind noise generator (subtle high-altitude breeze)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(380, ctx.currentTime);
      filter.Q.setValueAtTime(3.0, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.025, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(masterGain);
      whiteNoise.start();

      createdNodes.push(whiteNoise, filter, noiseGain);
      nodesRef.current = createdNodes;
    } catch {
      // AudioContext policy error handled gracefully
    }
  };

  const stopAtmosphericAudio = () => {
    if (audioCtxRef.current && masterGainRef.current) {
      const ctx = audioCtxRef.current;
      const gain = masterGainRef.current;
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setTimeout(() => {
        nodesRef.current.forEach((n) => {
          if ('stop' in n && typeof n.stop === 'function') {
            try {
              n.stop();
            } catch {
              // Ignore stopped node
            }
          }
        });
        if (ctx.state !== 'closed') {
          ctx.close().catch(() => {});
        }
        audioCtxRef.current = null;
        masterGainRef.current = null;
        nodesRef.current = [];
      }, 650);
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      startAtmosphericAudio();
      setIsPlaying(true);
    } else {
      stopAtmosphericAudio();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopAtmosphericAudio();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      aria-label={isPlaying ? 'Mute ambient soundscape' : 'Play ambient celestial soundscape'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#d4af37]/30 hover:border-[#d4af37]/70 bg-[#0c0d10]/60 hover:bg-[#14151a]/90 text-[#c9bfa7] hover:text-[#fae8b4] transition-all text-xs font-display tracking-widest cursor-pointer whitespace-nowrap shrink-0"
      title={isPlaying ? 'Soundscape Active' : 'Soundscape Muted'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span className="hidden sm:inline text-[11px] uppercase">Audio On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-[#8c8270]" />
          <span className="hidden sm:inline text-[11px] uppercase text-[#8c8270]">Muted</span>
        </>
      )}
    </button>
  );
}
