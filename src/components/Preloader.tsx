'use client';

import React, { useEffect } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    // Make text visible immediately
    gsap.set('.text-container', { opacity: 1 });

    // Animate text in
    tl.fromTo('.big-text', 
      { y: 200, opacity: 0, skewY: 10 },
      { 
        y: 0, 
        opacity: 1, 
        skewY: 0, 
        duration: 1.5, 
        stagger: 0.3, 
        ease: 'power3.out' 
      }
    )
    // Animate text out
    .to('.big-text', {
      y: -200,
      opacity: 0,
      skewY: -10,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.inOut'
    })
    // Hide preloader
    .to('.preloader', {
      height: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        document.body.style.overflow = 'unset';
        onComplete();
      }
    });

    return () => {
      document.body.style.overflow = 'unset';
      tl.kill();
    };
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