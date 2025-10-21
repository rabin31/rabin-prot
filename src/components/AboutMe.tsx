'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const collaborateRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const storyRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Image and text section
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from(textRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Timeline animation
      gsap.from(timelineRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Collaborate section
      gsap.from(collaborateRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: collaborateRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Cards stagger animation
      gsap.from([card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current], {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Story section
      gsap.from(storyRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Bottom images entrance
      gsap.from(img1Ref.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img1Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from(img2Ref.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: img2Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Image parallax on scroll (desktop only)
      if (window.innerWidth >= 768) {
        gsap.to(imageRef.current, {
          y: -30,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to(img1Ref.current, {
          y: -20,
          scrollTrigger: {
            trigger: img1Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });

        gsap.to(img2Ref.current, {
          y: -40,
          scrollTrigger: {
            trigger: img2Ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const principles = [
    {
      ref: card1Ref,
      number: '01',
      title: 'Make it',
      description: 'I design logos, social media posts, UI/UX, and websites. I build prototypes and fully functional solutions to bring ideas to life.'
    },
    {
      ref: card2Ref,
      number: '02',
      title: 'Collaborate',
      description: 'Good work is a team effort. I involve clients and teammates to iterate designs and ensure the best results.'
    },
    {
      ref: card3Ref,
      number: '03',
      title: 'Learn & Experiment',
      description: 'I love experimenting with GSAP animations, MERN stack, and WordPress, continuously learning to improve my craft.'
    },
    {
      ref: card4Ref,
      number: '04',
      title: 'Accessibility & Creativity',
      description: 'I aim for designs that are visually appealing, functional, and accessible to everyone.'
    }
  ];

  const timeline = [
    { company: 'Pearl Publication', role: 'Graphic Designer & Wordpress Developer', period: '21-22' },
    { company: 'Freelance', role: 'Graphic Designer & Web Developer', period: '22-25' },
  ];

  return (
    <div ref={containerRef} className='relative w-full py-24 sm:py-28 md:py-32 lg:py-38 xl:py-42 px-4 sm:px-6 md:px-8 overflow-hidden'>
      {/* Hero Title */}
      <h1 
        ref={titleRef} 
        className='font-acorn font-semibold text-[#025A4E] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center mb-6 sm:mb-8 md:mb-12 lg:mb-0 leading-tight'
        role="heading"
        aria-level={1}
      >
        I'm Rabin.
      </h1>

      {/* Introduction Section */}
      <section className='min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-0 py-6 sm:py-8 md:py-0'>
        <div 
          ref={imageRef} 
          className='h-[50vh] sm:h-[55vh] md:h-[70vh] lg:h-[85vh] w-full md:w-[40%] px-6 sm:px-8 md:px-12 lg:px-16 xl:px-28 md:pt-16 lg:pt-22 md:pb-32 lg:pb-42'
          aria-label="Profile image"
        >
          <div className='h-full w-full rounded-tl-[6rem] rounded-tr-[6rem] sm:rounded-tl-[8rem] sm:rounded-tr-[8rem] md:rounded-tl-full md:rounded-tr-full overflow-hidden shadow-xl md:shadow-2xl hover:shadow-3xl transition-shadow duration-500 group'>
            <img 
              src="./rabin.jpg" 
              alt="Rabin Thapa, Developer and Designer from Nepal" 
              className='object-cover h-full w-full group-hover:scale-110 transition-transform duration-700 ease-out'
              loading="eager"
            />
          </div>
        </div>

        <div ref={textRef} className='h-full w-full md:w-[60%] py-4 sm:py-6 md:py-16 lg:py-22 px-4 sm:px-6 md:px-8 lg:pr-24 xl:pr-38'>
          <h2 className='font-acorn font-semibold text-[#025A4E] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug md:leading-relaxed lg:leading-14'>
            I'm a Developer & Designer from Nepal.
          </h2>
          <p className='font-matter font-medium text-sm sm:text-base md:text-lg text-[#4C6763] mt-3 sm:mt-4 md:mt-6 leading-relaxed'>
            Over the past 3 years, I've worked in various areas of digital design, including graphic design, WordPress development, and app UI/UX. I'm proud to have worn many hats. <br/><br/>
            These days, I focus on mastering the MERN stack and creating animated web experiences using GSAP, while pursuing my BCA degree at Tribhuvan University. I'm also learning Java and constantly exploring new design trends to stay current in the ever-evolving tech landscape.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className='min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] px-4 sm:px-6 md:px-12 lg:px-24 xl:pl-92 md:pr-12 py-6 sm:py-8 md:py-12 lg:py-0 flex items-center'>
        <div className='w-full'>
          <div className='space-y-6 sm:space-y-8'>
            {timeline.map((item, index) => (
              <div key={index} className='flex items-center justify-between border-b border-[#E8F1F0] pb-4 sm:pb-6'>
                <div>
                  <h3 className='font-acorn font-semibold text-[#025A4E] text-lg sm:text-xl md:text-2xl'>{item.company}</h3>
                  <p className='font-matter font-medium text-[#4C6763] text-sm sm:text-base'>{item.role}</p>
                </div>
                <span className='font-matter font-medium text-[#7AA599] text-sm sm:text-base'>{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Call-out */}
      <section ref={collaborateRef} className='min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] px-4 sm:px-6 md:px-12 lg:px-24 xl:pl-92 md:pr-12 py-6 sm:py-8 md:py-12 lg:py-0 flex items-center'>
        <div className='w-full'>
          <h2 className='font-acorn font-semibold text-[#025A4E] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-snug md:leading-relaxed lg:leading-14'>
            Let's collaborate on creative and innovative projects.
          </h2>
          <p className='font-matter font-medium text-sm sm:text-base md:text-lg text-[#4C6763] mt-3 sm:mt-4 max-w-full md:max-w-lg lg:max-w-xl leading-relaxed md:leading-tight'>
            I believe in the power of creativity and technology to solve problems and create meaningful digital experiences. Whether you need stunning designs, robust web applications, or animated interactive websites, I'd love to bring your vision to life.
          </p>
        </div>
      </section>

      {/* Design Principles - Reduced Height */}
      <section className='w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12' aria-labelledby="principles-heading">
        <h2 id="principles-heading" className="sr-only">Design Principles</h2>
        <div className='min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-white shadow-sm rounded-2xl sm:rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] p-4 sm:p-6 md:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 h-full py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-22'>
            {principles.map((principle) => (
              <article 
                key={principle.number}
                ref={principle.ref} 
                className='rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3 md:space-y-4'
              >
                <span className='text-[#7AA599] font-acron font-semibold text-2xl sm:text-3xl md:text-4xl' aria-label={`Principle ${principle.number}`}>
                  {principle.number}
                </span>
                <h3 className='text-[#025A4E] font-acorn font-semibold text-xl sm:text-2xl md:text-3xl'>
                  {principle.title}
                </h3>
                <p className='font-matter text-sm sm:text-base md:text-lg text-[#4C6763] font-medium max-w-full leading-relaxed'>
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Background Story */}
      <section ref={storyRef} className='min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] px-4 sm:px-6 md:px-12 lg:px-24 xl:pl-92 flex items-center py-8 sm:py-10 md:py-0'>
        <div className='font-matter font-medium text-sm sm:text-base md:text-lg text-[#4F6965] max-w-full md:max-w-lg lg:max-w-xl space-y-4 sm:space-y-5 md:space-y-6 leading-relaxed'>
          <p>
            Before I stepped into the world of development, I was a graphic designer. One of my earliest professional experiences involved creating visual content for publications, where I learned the importance of visual storytelling and brand consistency.
          </p>
          <p>
            Designing for print and digital media forced me to understand how typography, color, and layout work together, skills I've carried and kept fresh in the years since. My side project work is just an excuse to satisfy my curiosity about new technologies and understand how the web is moving forward.
          </p>
          <p>
            Currently, I'm expanding my skills by learning Java and exploring emerging design trends to create more robust and innovative solutions. I enjoy working on personal projects that combine my love for creativity and code, and drawing inspiration from the rich culture and natural beauty of Nepal.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className='h-auto md:h-[70vh] lg:h-[85vh] w-full flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 mt-6 sm:mt-8 px-4 sm:px-6 md:px-8 lg:px-0' aria-label="Photo gallery">
        <figure 
          ref={img1Ref} 
          className='h-[40vh] sm:h-[45vh] md:h-[60vh] lg:h-[85vh] relative w-full md:w-[60%] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg md:shadow-xl group'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500' aria-hidden="true"></div>
          <img 
            src="/rabin1.jpg" 
            alt="Rabin working on design projects" 
            className='object-cover h-full w-full'
            loading="lazy"
          />
          <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
            <p className='text-[#025A4E] font-matter font-semibold text-sm sm:text-base'>Asian Hackthon 2025</p>
          </div>
        </figure>
        <figure 
          ref={img2Ref} 
          className='h-[40vh] sm:h-[45vh] md:h-[60vh] lg:h-[85vh] relative w-full md:w-[30%] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg md:shadow-xl group'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500' aria-hidden="true"></div>
          <img 
            src="/rabin2.jpg" 
            alt="Rabin in Nepal" 
            className='object-cover h-full w-full'
            loading="lazy"
          />
          <div className='absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
            <p className='text-[#025A4E] font-matter font-semibold text-sm sm:text-base'>Dashin</p>
          </div>
        </figure>
      </section>
    </div>
  )
}

export default AboutMe;