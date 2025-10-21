'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to('body', {
      overflow: 'hidden',
    })
      .to(
        '.preloader .text-container',
        {
          duration: 0,
          opacity: 1,
          ease: 'power3.out',
        }
      )
      .from('.preloader .text-container h1', {
        duration: 1.5,
        delay: 0.2,
        y: 200,
        skewY: 10,
        stagger: 0.4,
        ease: 'power3.out',
      })
      .to('.preloader .text-container h1', {
        duration: 1.2,
        y: 200,
        skewY: -20,
        stagger: 0.2,
        ease: 'power3.out',
      })
      .to('.preloader', {
        duration: 1,
        height: '0vh',
        ease: 'power3.out',
      })
      .to(
        'body',
        {
          overflow: 'auto',
        },
        '-=1'
      )
      .set('.preloader', { display: 'none' });
  }, [onComplete]);

  return (
    <div className="preloader fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#025A4E] overflow-hidden z-50">
      <div className="text-container flex flex-row gap-2 sm:gap-3 md:gap-4 overflow-hidden text-white opacity-0 px-4 sm:px-8 md:px-14">
        <h1 className="big-text font-acorn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Creative</h1>
        <h1 className="big-text font-acorn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Designer</h1>
        <h1 className="big-text font-acorn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">&</h1>
        <h1 className="big-text font-acorn text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">Developer</h1>
      </div>
    </div>
  );
};

export default Preloader;