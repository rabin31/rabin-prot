'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1 cards animation
      gsap.from([card1Ref.current, card2Ref.current], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row1Ref.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });

      // Row 2 cards animation
      gsap.from([card3Ref.current, card4Ref.current], {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: row2Ref.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });

      // Parallax effect on scroll
      gsap.to(card1Ref.current, {
        y: -50,
        scrollTrigger: {
          trigger: row1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(card2Ref.current, {
        y: -30,
        scrollTrigger: {
          trigger: row1Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(card3Ref.current, {
        y: -30,
        scrollTrigger: {
          trigger: row2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(card4Ref.current, {
        y: -50,
        scrollTrigger: {
          trigger: row2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className='relative w-full min-h-screen flex flex-col items-center justify-center'>
       <div ref={row1Ref} className='h-screen w-full flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-18 gap-6 md:gap-12'>
          <Link href='/works/logo' ref={card1Ref} className='h-[45vh] md:h-full relative w-full md:w-[35%] bg-[#D592EC] rounded-3xl md:rounded-[3rem] group overflow-hidden'>
            <div className='right-6 md:right-10 top-6 md:top-10 absolute flex flex-col text-right gap-1'>
               <p className='uppercase text-xs md:text-sm font-matter text-[#344542] tracking-[0.15rem] md:tracking-[0.2rem]'>I CAN DESIGN</p>
               <h1 className='font-acorn text-2xl md:text-3xl lg:text-4xl font-semibold text-[#344542]'>Logos</h1>
               <div className=''>
                  <img src="./logo.png" alt="" className='object-cover group-hover:scale-105 transform transition-transform duration-300' />
               </div>
            </div>
          </Link>

          <Link href="/works/web" ref={card2Ref} className='h-[45vh] md:h-full relative w-full md:w-[65%] bg-[#9ADFD5] rounded-3xl md:rounded-[3rem] group overflow-hidden'>
          <div className='right-6 md:right-10 top-6 md:top-10 absolute flex flex-col text-right gap-1'>
               <p className='uppercase text-xs md:text-sm font-matter text-[#344542] tracking-[0.15rem] md:tracking-[0.2rem]'>I CAN DEVELOP</p>
               <h1 className='font-acorn text-2xl md:text-3xl lg:text-4xl font-semibold text-[#344542]'>Websites</h1>
               <div className='overflow-hidden'>
                  <img src="./web.png" alt="" className='object-cover ml-3 md:ml-5 mt-2 md:mt-4 rounded-xl md:rounded-2xl group-hover:scale-105 transform transition-transform duration-300' />
               </div>
         </div>
          </Link>
       </div>

       <div ref={row2Ref} className='h-screen w-full flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 md:px-8 py-8 md:py-18 gap-6 md:gap-12'>
          <Link href="/works/social" ref={card3Ref} className='h-[45vh] md:h-full relative w-full md:w-[65%] bg-[#F0B695] rounded-3xl md:rounded-[3rem] group'>
          <div className='right-6 md:right-10 top-6 md:top-10 absolute flex flex-col text-right gap-1'>
               <p className='uppercase text-xs md:text-sm font-matter text-[#344542] tracking-[0.15rem] md:tracking-[0.2rem]'>I CAN DESIGN</p>
               <h1 className='font-acorn text-2xl md:text-3xl lg:text-4xl font-semibold text-[#344542]'>Ads</h1>
               <div>
                  <img src="./social.png" alt="" className='object-cover group-hover:scale-105 transform transition-transform duration-300' />
               </div>
         </div>
          </Link>

          <div ref={card4Ref} className='h-[45vh] md:h-full relative w-full md:w-[35%] bg-[#B7E0FF] rounded-3xl md:rounded-[3rem] group overflow-hidden'>
          <div className='right-6 md:right-10 top-6 md:top-10 absolute flex flex-col text-right gap-1'>
               <p className='uppercase text-xs md:text-sm font-matter text-[#344542] tracking-[0.15rem] md:tracking-[0.2rem]'>I CAN DESIGN</p>
               <h1 className='font-acorn text-2xl md:text-3xl lg:text-4xl font-semibold text-[#344542]'>Ui & Ux</h1>
               <div className=''>
                  <img src="./uiux.png" alt="" className='object-cover group-hover:scale-105 transform transition-transform duration-300' />
               </div>
         </div>
          </div>
       </div>
       
    </div>
  )
}

export default Works;