'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image'; // Import Next.js Image component

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [role] = useState('Developer.'); // Removed unused setRole
  const heroRef = useRef(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef(null);
  const descRef = useRef(null);
  const star1Ref = useRef(null);
  const star2Ref = useRef(null);

  useEffect(() => {
    // Intro animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate heading
      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate second line (keeping it as one)
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

      // Animate stars
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

      // ScrollTrigger animations
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="h-[90vh] w-full relative flex flex-col items-center justify-between py-8 md:py-16 px-4">
      <div className="flex-1 flex flex-col font-acorn items-center justify-center mt-8 md:mt-16">
        <h1 ref={headingRef} className="text-[#025A4E] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center">
          Hi. I&apos;m Rabin.
        </h1>
        <h1 className="text-[#025A4E] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-center flex flex-wrap items-center justify-center gap-2 md:gap-4">
          <span className="sticky top-1/2">A</span>
          <span ref={roleRef} className="inline-block min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] xl:min-w-[400px] text-left">{role}</span>
        </h1>
      </div>

      <p ref={descRef} className="text-center pt-4 md:pt-6 max-w-[90%] md:max-w-[56ch] text-[#698682] font-matter font-medium text-base md:text-lg px-4">
        I&apos;m passionate about crafting experiences that are engaging, accessible, and user-centric.
      </p>
      
      <div ref={star1Ref} className='absolute z-44 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bottom-20 left-4 sm:bottom-32 sm:left-20 md:bottom-40 md:left-60'>
        <Image 
          src="/star.png" 
          alt='Hero Circle' 
          width={80}
          height={80}
          className='h-full w-full object-contain'
        />
      </div>
      
      <div ref={star2Ref} className='absolute z-44 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 top-20 right-4 sm:top-32 sm:right-20 md:top-40 md:right-60'>
        <Image 
          src="/star.png" 
          alt='Hero Circle' 
          width={80}
          height={80}
          className='h-full w-full object-contain'
        />
      </div>
    </div>
  );
};

export default Hero;