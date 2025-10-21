'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [role] = useState('Developer.');
  const heroRef = useRef(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate heading
      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate second line
      if (headingRef.current?.nextElementSibling) {
        tl.from(headingRef.current.nextElementSibling, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4');
      }

      // Animate description
      tl.from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.3');

      // Only animate stars on non-mobile devices
      if (window.innerWidth >= 768) {
        tl.from(star1Ref.current, {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
        }, '-=0.4');

        tl.from(star2Ref.current, {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
        }, '-=0.5');

        // ScrollTrigger animations only for non-mobile
        gsap.to(star1Ref.current, {
          rotation: 360,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to(star2Ref.current, {
          rotation: -360,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="h-[50vh] md:min-h-[85vh] md:h-auto w-full relative flex flex-col items-center justify-between py-4 md:py-12 lg:py-16 px-4"
    >
      {/* Main content container */}
      <div className="flex-1 flex flex-col font-acorn items-center justify-center w-full mt-2 md:mt-8 lg:mt-12 xl:mt-16 mb-4 md:mb-8">
        <h1 
          ref={headingRef} 
          className="text-[#025A4E] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center leading-tight md:leading-normal"
        >
          Hi. I&apos;m Rabin.
        </h1>
        
        <h1 className="text-[#025A4E] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 mt-1 md:mt-4">
          <span className="md:sticky md:top-1/2">A</span>
          <span 
            ref={roleRef} 
            className="inline-block text-center md:text-left min-w-0 md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px]"
          >
            {role}
          </span>
        </h1>
      </div>

      {/* Description */}
      <p 
        ref={descRef} 
        className="text-center pt-2 md:pt-6 lg:pt-8 max-w-[90%] md:max-w-[56ch] text-[#698682] font-matter font-medium text-sm md:text-lg lg:text-xl px-4 mb-4 md:mb-8 lg:mb-12"
      >
        I&apos;m passionate about crafting experiences that are engaging, accessible, and user-centric.
      </p>
      
      {/* Stars - hidden on mobile, visible on md and above */}
      <div 
        ref={star1Ref} 
        className="hidden md:block absolute z-44 h-16 w-16 md:h-16 md:w-16 lg:h-20 lg:w-20 bottom-32 md:bottom-32 md:left-16 lg:bottom-40 lg:left-24 xl:bottom-48 xl:left-32"
      >
        <Image 
          src="/star.png" 
          alt="Hero Star" 
          width={80}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </div>
      
      <div 
        ref={star2Ref} 
        className="hidden md:block absolute z-44 h-16 w-16 md:h-16 md:w-16 lg:h-20 lg:w-20 top-32 md:top-32 md:right-16 lg:top-40 lg:right-24 xl:top-48 xl:right-32"
      >
        <Image 
          src="/star.png" 
          alt="Hero Star" 
          width={80}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;