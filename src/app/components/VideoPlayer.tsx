import React, { useRef } from 'react';
import { motion } from 'motion/react';

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string; // Applied to the container
  videoClassName?: string; // Applied to the video element
}

export function VideoPlayer({ src, className, videoClassName, poster, ...props }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative bg-neutral-100 dark:bg-neutral-800 ${className}`}>
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        poster={poster}
        className={`block w-full h-full object-cover ${videoClassName}`}
        {...props}
      />
    </div>
  );
}