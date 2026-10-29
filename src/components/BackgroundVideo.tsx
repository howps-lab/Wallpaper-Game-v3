import { useEffect, useRef } from 'react';

interface BackgroundVideoProps {
  opacity?: number;
}

export default function BackgroundVideo({ opacity = 1 }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted and playsInline to ensure autoplay in all browsers
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.play().catch(() => {});
    };

    attemptPlay();

    const handleUserInteraction = () => {
      if (video && video.paused) {
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('loadedmetadata', attemptPlay);
    video.addEventListener('canplay', attemptPlay);
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none bg-black"
      aria-hidden="true"
      style={{ opacity }}
    >
      {/* Full-screen background video covering the entire viewport edge-to-edge */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-[5%_center] sm:object-[6%_center] md:object-[8%_center] lg:object-[10%_center] xl:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/video-poster.jpg"
        src="/video/fantasy_video_of_mountains_final.mp4"
      >
        <source src="/video/fantasy_video_of_mountains_final.mp4" type="video/mp4" />
        <source
          src="/assets/aistudio/fantasy_video_of_mountains_final_574dacd4.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
